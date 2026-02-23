#!/usr/bin/env python3
"""
Convert BE Projects Tracker CSV (SharePoint export) to dashboard-data.json.
Skips line 1 (ListSchema), uses line 2 as headers.
"""
import csv
import json
import re
from pathlib import Path

# CSV status -> dashboard status (for tabs: All, On Hold, Delayed, On Track, Closing)
STATUS_MAP = {
    "On Track": "On Track",
    "Slightly Delay": "Slightly Delayed",  # donut uses "Slightly Delayed"
    "Major Delay": "Delayed",
    "OnHold": "On Hold",
    "Completed": "Closing",  # show under Closing tab
    "Cancelled": "Cancelled",
    "Not Started": "On Track",  # treat as on track
    "": "On Track",
}


def parse_sbu(sbu_raw: str) -> str:
    """Parse SBU/Function JSON array e.g. ["IT"] or ["ALUMINUM","Phosphate"], return first value."""
    if not sbu_raw or not sbu_raw.strip():
        return "Other"
    s = sbu_raw.strip()
    # Try JSON parse first (handles "Legal, GRC, Audit" as single choice)
    match = re.search(r'\[.*\]', s)
    if match:
        try:
            arr = json.loads(match.group(0).replace('""', '"'))
            return arr[0] if arr else "Other"
        except json.JSONDecodeError:
            pass
        # Fallback: naive split
        inner = re.search(r'\[([^\]]+)\]', s)
        if inner:
            parts = [p.strip().strip('"') for p in inner.group(1).split(",")]
            return parts[0] if parts else "Other"
    return s or "Other"


def default_progress(status: str) -> tuple[int, int]:
    """Return (plannedProgress, actualProgress) as 0-100 based on status."""
    defaults = {
        "Closing": (90, 95),
        "On Track": (75, 75),
        "Slightly Delayed": (60, 55),
        "Delayed": (55, 50),
        "On Hold": (50, 48),
        "Cancelled": (25, 25),
    }
    return defaults.get(status, (50, 50))


def main():
    base = Path(__file__).resolve().parent.parent
    csv_path = Path.home() / "Downloads" / "BE Projects Tracker.csv"
    out_path = base / "data" / "dashboard-data.json"

    rows = []
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        first = next(reader)  # skip schema line
        headers = next(reader)
        for row in reader:
            if len(row) < 8:
                continue
            rows.append(row)

    # Headers: Project Name, Demand Number, SBU/Function, Stage, Portfolio, Business Focal Point, Status, Project Manager, ...
    idx = {h.strip(): i for i, h in enumerate(headers)}
    get = lambda r, k: (r[idx[k]] if k in idx and idx[k] < len(r) else "").strip()

    projects = []
    for i, r in enumerate(rows):
        name = get(r, "Project Name") or get(r, "Project Name")
        if not name:
            continue
        sbu_raw = get(r, "SBU/Function")
        department = parse_sbu(sbu_raw)
        stage = get(r, "Stage") or "Execution"
        portfolio = get(r, "Portfolio") or ""
        status_raw = get(r, "Status")
        status = STATUS_MAP.get(status_raw, "On Track")
        pm = get(r, "Project Manager")
        planned, actual = default_progress(status)

        projects.append({
            "id": i + 1,
            "name": name,
            "department": department,
            "portfolio": portfolio,
            "status": status,
            "lifecycleStage": stage,
            "projectManager": pm or "—",
            "plannedProgress": planned,
            "actualProgress": actual,
        })

    total = len(projects)
    if total == 0:
        print("No projects found")
        return

    # KPIs (as 0-100 percentages; main.js divides by 100)
    on_track = sum(1 for p in projects if p["status"] == "On Track")
    major_delay = sum(1 for p in projects if p["status"] == "Delayed")
    slightly_delay = sum(1 for p in projects if p["status"] == "Slightly Delayed")
    kpis = {
        "onTrackRate": round(100 * on_track / total) if total else 0,
        "majorDelayRate": round(100 * major_delay / total) if total else 0,
        "slightlyDelayRate": round(100 * slightly_delay / total) if total else 0,
        "totalProjects": total,
    }

    # projectStatusOverview: for donut (status -> count, percentage)
    status_counts = {}
    for p in projects:
        s = p["status"]
        status_counts[s] = status_counts.get(s, 0) + 1
    status_order = ["On Track", "Slightly Delayed", "Delayed", "On Hold", "Closing", "Cancelled"]
    project_status_overview = []
    for s in status_order:
        c = status_counts.get(s, 0)
        if c > 0:
            project_status_overview.append({
                "status": s,
                "percentage": round(100 * c / total) if total else 0,
            })
    for s, c in status_counts.items():
        if s not in status_order:
            project_status_overview.append({
                "status": s,
                "percentage": round(100 * c / total) if total else 0,
            })

    # projectsByLifecycleStage
    stage_order = ["Initiation", "Solutioning", "Procurement", "Execution", "Closing"]
    stage_counts = {}
    for p in projects:
        st = p["lifecycleStage"]
        stage_counts[st] = stage_counts.get(st, 0) + 1
    projects_by_lifecycle = []
    for st in stage_order:
        c = stage_counts.get(st, 0)
        projects_by_lifecycle.append({"stage": st, "count": c})
    for st, c in stage_counts.items():
        if st not in stage_order:
            projects_by_lifecycle.append({"stage": st, "count": c})

    # Filters: unique values
    depts = sorted(set(p["department"] for p in projects))
    portfolios = []
    for r in rows:
        pv = get(r, "Portfolio")
        if pv and pv not in portfolios:
            portfolios.append(pv)
    portfolios.sort()
    pms = sorted(set(p["projectManager"] for p in projects if p["projectManager"] and p["projectManager"] != "—"))
    statuses = ["All"] + sorted(s for s in set(p["status"] for p in projects))
    stage_set = {s for s in set(p["lifecycleStage"] for p in projects) if s}
    stages = ["All"] + sorted(s for s in stage_set if s != "All")

    filters = {
        "businessUnits": ["All"] + depts,
        "portfolios": ["All"] + [p for p in portfolios if p],
        "projectManagers": ["All"] + pms,
        "projectStatus": statuses,
        "lifecycleStage": stages,
    }

    out = {
        "kpis": kpis,
        "filters": filters,
        "projectStatusOverview": project_status_overview,
        "projectsByLifecycleStage": projects_by_lifecycle,
        "projects": projects,
    }

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(projects)} projects to {out_path}")


if __name__ == "__main__":
    main()
