/* Donut colors matching reference: On Track golden-tan, Slightly Delayed dark grey, On Hold light grey, Closing/Completed dark brownish-grey, Cancelled medium grey */
const STATUS_COLORS = {
  "On Track": "#D6C087",
  "Slightly Delayed": "#5D5D5D",
  Delayed: "#5D5D5D",
  "On Hold": "#E0E0E0",
  Closing: "#403F3B",
  Completed: "#403F3B",
  Cancelled: "#6F6F6F"
};

const STAGE_COLOR = "#B4A56F";

async function loadDashboardData() {
  // Load the main dashboard data file (user-provided)
  const response = await fetch("./data/dashboard-data.json");
  if (!response.ok) {
    // Fail quietly but keep layout
    // eslint-disable-next-line no-console
    console.error("Failed to load data.json");
    return null;
  }
  return response.json();
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

/** Convert project manager email to display name (e.g. inayatullahm@Maaden.com.sa → Inayatullah M) */
function formatManagerName(email) {
  if (!email || email === "—") return email;
  if (!email.includes("@")) return email;
  const local = email.split("@")[0];
  // CamelCase: ChakraborttyG → Chakrabortty G
  const withSpaces = local.replace(/([A-Z])/g, " $1").trim();
  const parts = withSpaces.split(/\s+/).filter(Boolean);
  if (parts.length > 0 && withSpaces !== local) {
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
  }
  // All lowercase: inayatullahm → Inayatullah M (treat last char as initial)
  if (/^[a-z]+[a-z]$/i.test(local)) {
    const name = local.slice(0, -1);
    const initial = local.slice(-1).toUpperCase();
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + " " + initial;
  }
  return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
}

function renderFilters(filters, filterState, onFilterChange) {
  const container = document.getElementById("filter-row");
  container.innerHTML = "";

  filters.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "filter-chip-wrap";
    wrap.dataset.filterId = f.id;

    const value = filterState[f.id] ?? "All";
    const displayValue =
      value === "All"
        ? ""
        : f.id === "projectManager" && value.includes("@")
          ? formatManagerName(value)
          : value;

    const chip = document.createElement("button");
    chip.className = "filter-chip";
    chip.type = "button";
    chip.setAttribute("aria-expanded", "false");
    chip.setAttribute("aria-haspopup", "listbox");
    chip.innerHTML = `
      <span class="filter-chip-label">${f.label}</span>
      <span class="filter-chip-value">
        <span>${displayValue}</span>
        <span class="filter-chevron"></span>
      </span>
    `;

    const dropdown = document.createElement("div");
    dropdown.className = "filter-dropdown";
    dropdown.hidden = true;
    (f.options ?? []).forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-dropdown-option" + (opt === value ? " is-selected" : "");
      btn.textContent =
        f.id === "projectManager" && opt !== "All" && opt.includes("@")
          ? formatManagerName(opt)
          : opt;
      btn.dataset.value = opt;
      btn.addEventListener("click", () => {
        onFilterChange(f.id, opt);
        dropdown.hidden = true;
      });
      dropdown.appendChild(btn);
    });

    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = document.querySelector(".filter-dropdown:not([hidden])");
      if (open && open !== dropdown) {
        open.hidden = true;
        open.previousElementSibling?.setAttribute("aria-expanded", "false");
        open.previousElementSibling?.classList.remove("is-open");
      }
      const isOpen = dropdown.hidden;
      dropdown.hidden = !isOpen;
      chip.setAttribute("aria-expanded", String(!dropdown.hidden));
      chip.classList.toggle("is-open", !dropdown.hidden);
    });

    wrap.appendChild(chip);
    wrap.appendChild(dropdown);
    container.appendChild(wrap);
  });
}

function closeFilterDropdowns() {
  document.querySelectorAll(".filter-dropdown").forEach((d) => {
    d.hidden = true;
    d.previousElementSibling?.classList.remove("is-open");
    d.previousElementSibling?.setAttribute("aria-expanded", "false");
  });
}

function getKpiIcon(id) {
  const icons = {
    onTrackRate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    majorDelayRate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    slightlyDelayRate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    totalProjects: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`
  };
  return icons[id] ?? icons.totalProjects;
}

function renderKpis(kpis) {
  const row = document.getElementById("kpi-row");
  row.innerHTML = "";

  kpis.forEach((kpi) => {
    const card = document.createElement("article");
    card.className = "kpi-card";
    card.dataset.kpiId = kpi.id;

    const displayValue =
      kpi.unit === "%"
        ? `${Math.round(kpi.value * 100)}`
        : new Intl.NumberFormat().format(kpi.value);
    const displayUnit = kpi.unit === "%" ? "%" : kpi.unit;

    card.innerHTML = `
      <div class="kpi-header">
        <span class="kpi-label">${kpi.label}</span>
        <div class="kpi-icon-wrap" aria-hidden="true">${getKpiIcon(kpi.id)}</div>
      </div>
      <div class="kpi-main">
        <div class="kpi-value-wrap">
          <span class="kpi-value">${displayValue}</span>
          <span class="kpi-unit">${displayUnit}</span>
        </div>
      </div>
      <p class="kpi-sub">${kpi.description ?? ""}</p>
    `;

    row.appendChild(card);
  });
}

const TAB_DISPLAY = { "On Hold": "OnHold", "On Track": "OnTrack" };

function renderProjectTabs(tabs) {
  const container = document.getElementById("projects-tabs");
  container.innerHTML = "";

  tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "projects-tab" + (index === 0 ? " is-active" : "");
    button.dataset.tab = tab;
    button.textContent = TAB_DISPLAY[tab] ?? tab;
    container.appendChild(button);
  });
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.status = project.status;
  card.dataset.lifecycle = project.lifecycle;
  card.dataset.projectId = String(project.id);

  const statusClass =
    {
      "On Track": "status-ontrack",
      Delayed: "status-delayed",
      "Slightly Delayed": "status-delayed",
      "On Hold": "status-onhold",
      Closing: "status-closing"
    }[project.status] ?? "status-ontrack";

  const statusDisplay =
    { "On Track": "OnTrack", "On Hold": "OnHold", "Slightly Delayed": "Slightly Del" }[
      project.status
    ] ?? project.status;

  const plannedText = formatPercent(project.plannedProgress);
  const actualText = formatPercent(project.actualProgress);

  const actualPercent = Math.max(
    0,
    Math.min(1, Number(project.actualProgress) || 0)
  );

  const plannedPercent = Math.max(0, Math.min(1, Number(project.plannedProgress) || 0));
  card.innerHTML = `
    <header class="project-header">
      <div class="project-title-block">
        <h3 class="project-name">${project.name}</h3>
        <div class="project-meta-row">
          <span class="project-meta">${project.department}</span>
          <span class="project-badge">${project.lifecycle}</span>
        </div>
      </div>
      <div class="project-header-right">
        <span class="project-status-pill ${statusClass}">${statusDisplay}</span>
      </div>
    </header>
    <div class="project-body">
      <div class="project-row">
        <span>Project Manager</span>
        <strong>${formatManagerName(project.manager)}</strong>
      </div>
      <div class="progress-row">
        <div class="progress-labels">
          <span class="progress-label">
            <span class="progress-label-name">Planned</span>
            <strong class="progress-label-value progress-label-value-planned">${plannedText}</strong>
          </span>
          <span class="progress-label">
            <span class="progress-label-name">Actual</span>
            <strong class="progress-label-value">${actualText}</strong>
          </span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" role="progressbar" aria-valuenow="${Math.round(actualPercent * 100)}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-track"></div>
            <div class="progress-fill" style="width: ${actualPercent * 100}%;"></div>
            <span class="progress-marker progress-marker-planned" style="left: ${plannedPercent * 100}%;"></span>
            <span class="progress-marker progress-marker-actual" style="left: ${actualPercent * 100}%;"></span>
          </div>
          <button type="button" class="project-menu" aria-label="Open menu">
            <span class="project-menu-dot"></span>
            <span class="project-menu-dot"></span>
            <span class="project-menu-dot"></span>
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function formatDate(str) {
  if (!str || str === "—") return "—";
  try {
    const d = new Date(str);
    if (Number.isNaN(d.getTime())) return str;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return str;
  }
}

function parsePhaseMonths(phaseDates) {
  const phases = [
    { key: "initiation", label: "Initiation (Planning & Setup)", dates: phaseDates?.initiation, defStart: 0, defMonths: 2 },
    { key: "procurement", label: "Procurement (Resource Acquisition)", dates: phaseDates?.procurement, defStart: 2, defMonths: 4 },
    { key: "execution", label: "Execution (Implementation Phase)", dates: phaseDates?.execution, defStart: 5, defMonths: 7 },
    { key: "closure", label: "Go-Live - Closing (Launch & Finalization)", dates: phaseDates?.closure, defStart: 9, defMonths: 2 }
  ];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let minMonth = 0;
  let maxMonth = 11;
  const bars = phases.map((ph) => {
    let startM = ph.defStart ?? 0;
    let months = ph.defMonths ?? 2;
    if (ph.dates?.start && ph.dates?.end) {
      const s = new Date(ph.dates.start);
      const e = new Date(ph.dates.end);
      if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime())) {
        startM = s.getMonth() + s.getFullYear() * 12;
        const endM = e.getMonth() + e.getFullYear() * 12;
        months = Math.max(1, endM - startM + 1);
      }
    }
    return { ...ph, startMonth: startM, endMonth: startM + months - 1, months };
  });
  const allStarts = bars.map((b) => b.startMonth);
  const allEnds = bars.map((b) => b.endMonth);
  if (allStarts.length) minMonth = Math.min(...allStarts);
  if (allEnds.length) maxMonth = Math.max(...allEnds);
  const span = Math.max(12, maxMonth - minMonth + 1);
  return { bars, monthNames, minMonth, span };
}

function renderProjectModal(project) {
  const get = (v) => (v != null && v !== "" ? v : "—");
  const idEl = document.getElementById("modal-project-id");
  const createdEl = document.getElementById("modal-created-date");
  const nameEl = document.getElementById("modal-project-name");
  const statusEl = document.getElementById("modal-status-pill");
  const stageEl = document.getElementById("modal-stage");
  const sbuEl = document.getElementById("modal-sbu");
  const beneficiaryEl = document.getElementById("modal-beneficiary");
  const portfolioEl = document.getElementById("modal-portfolio");
  const sponsorEl = document.getElementById("modal-sponsor");
  const bizFocalEl = document.getElementById("modal-business-focal");
  const itPmEl = document.getElementById("modal-it-pm");
  const milestoneEl = document.getElementById("modal-milestone");
  const addedValuesEl = document.getElementById("modal-added-values");
  const demandEl = document.getElementById("modal-demand");
  const updatesEl = document.getElementById("modal-updates");
  const challengesEl = document.getElementById("modal-challenges");
  const plannedEl = document.getElementById("modal-planned-activities");
  const progressPlannedEl = document.getElementById("modal-progress-planned");
  const progressActualEl = document.getElementById("modal-progress-actual");
  const plannedPctEl = document.getElementById("modal-planned-pct");
  const actualPctEl = document.getElementById("modal-actual-pct");
  const timelineEl = document.getElementById("modal-timeline");

  const projectId = project.demandNumber || `PRJ-2024-${String(project.id).padStart(3, "0")}`;
  const createdDate = formatDate(project.demandCreationDate || project.modified || "");

  if (idEl) idEl.textContent = projectId;
  if (createdEl) createdEl.textContent = `Created: ${createdDate}`;
  if (nameEl) nameEl.textContent = get(project.name);
  if (stageEl) stageEl.textContent = get(project.lifecycle || project.lifecycleStage);
  if (sbuEl) sbuEl.textContent = get(project.department);
  if (beneficiaryEl) beneficiaryEl.textContent = get(project.beneficiaryDepartment);
  if (portfolioEl) portfolioEl.textContent = get(project.portfolio);
  if (sponsorEl) sponsorEl.textContent = formatManagerName(get(project.sponsor));
  if (bizFocalEl) bizFocalEl.textContent = formatManagerName(get(project.businessFocalPoint));
  if (itPmEl) itPmEl.textContent = formatManagerName(get(project.manager || project.projectManager));
  if (milestoneEl) milestoneEl.textContent = get(project.milestone);
  if (demandEl) demandEl.textContent = get(project.demandDescription);

  statusEl.textContent = get(project.status);
  statusEl.className = "modal-status-pill " + (
    { "On Track": "status-ontrack", Delayed: "status-delayed", "Slightly Delayed": "status-delayed", "On Hold": "status-onhold", Closing: "status-closing" }[project.status] || "status-ontrack"
  );

  const added = project.addedValues || [];
  addedValuesEl.innerHTML = added.length ? added.map((v) => `<li>${String(v)}</li>`).join("") : "<li>—</li>";

  const updates = project.update ? (typeof project.update === "string" ? project.update.split(/\n|•/).filter(Boolean) : []) : [];
  updatesEl.innerHTML = updates.length ? updates.map((u) => `<li>${String(u).trim()}</li>`).join("") : "<li>—</li>";

  const challenges = [...(project.challenges || []), ...(project.risks || [])];
  challengesEl.innerHTML = challenges.length ? challenges.map((c) => `<li>${String(c)}</li>`).join("") : "<li>—</li>";

  const planned = project.plannedActivities || [];
  plannedEl.innerHTML = planned.length ? planned.map((p) => `<li>${String(p)}</li>`).join("") : "<li>—</li>";

  const plannedPct = Math.round((project.plannedProgress ?? 0) * 100);
  const actualPct = Math.round((project.actualProgress ?? 0) * 100);
  if (plannedPctEl) plannedPctEl.textContent = `${plannedPct}%`;
  if (actualPctEl) actualPctEl.textContent = `${actualPct}%`;
  if (progressPlannedEl) progressPlannedEl.style.width = `${plannedPct}%`;
  if (progressActualEl) progressActualEl.style.width = `${actualPct}%`;

  const { bars, monthNames, minMonth, span } = parsePhaseMonths(project.phaseDates);
  const totalCols = Math.min(12, Math.max(6, span));
  const monthLabels = [];
  for (let i = 0; i < totalCols; i++) {
    const m = (minMonth + i) % 12;
    const y = Math.floor((minMonth + i) / 12);
    monthLabels.push(monthNames[m] + (y > 0 ? ` '${String(y).slice(-2)}` : ""));
  }
  const monthRow = `<div class="modal-timeline-header"><span class="modal-timeline-phase-label"></span><div class="modal-timeline-months" style="--timeline-cols: ${totalCols}"><div class="modal-timeline-months-inner">${monthLabels.map((m) => `<span class="modal-timeline-month">${m}</span>`).join("")}</div></div></div>`;
  const phaseRows = bars
    .map((b) => {
      const startCol = Math.max(1, b.startMonth - minMonth + 1);
      const span = Math.max(1, Math.min(b.months, totalCols - startCol + 1));
      return `
    <div class="modal-timeline-phase">
      <span class="modal-timeline-phase-label">${b.label}</span>
      <div class="modal-timeline-months" style="--timeline-cols: ${totalCols}">
        <div class="modal-timeline-bar" style="grid-column: ${startCol} / span ${span};">${b.months} month${b.months !== 1 ? "s" : ""}</div>
      </div>
    </div>
  `;
    })
    .join("");
  timelineEl.innerHTML = monthRow + phaseRows;
}

function openProjectModal(project) {
  renderProjectModal(project);
  const backdrop = document.getElementById("project-modal-backdrop");
  if (backdrop) {
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal() {
  const backdrop = document.getElementById("project-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function applyFilters(projects, filterState) {
  return projects.filter((p) => {
    if (filterState.businessUnit && filterState.businessUnit !== "All" && p.department !== filterState.businessUnit)
      return false;
    if (filterState.portfolio && filterState.portfolio !== "All" && (p.portfolio || "") !== filterState.portfolio)
      return false;
    if (filterState.projectManager && filterState.projectManager !== "All" && p.manager !== filterState.projectManager)
      return false;
    if (filterState.projectStatus && filterState.projectStatus !== "All" && p.status !== filterState.projectStatus)
      return false;
    if (filterState.lifecycleStage && filterState.lifecycleStage !== "All" && p.lifecycle !== filterState.lifecycleStage)
      return false;
    return true;
  });
}

function computeDerivedFromProjects(projects) {
  const total = projects.length || 1;
  const onTrack = projects.filter((p) => p.status === "On Track").length;
  const majorDelay = projects.filter((p) => p.status === "Delayed").length;
  const slightlyDelay = projects.filter((p) => p.status === "Slightly Delayed").length;
  const statusCounts = {};
  projects.forEach((p) => {
    statusCounts[p.status] = (statusCounts[p.status] ?? 0) + 1;
  });
  const statusOverview = DONUT_SEGMENT_ORDER.filter((s) => (statusCounts[s] ?? 0) > 0).map(
    (s) => ({ status: s, value: Math.round((100 * (statusCounts[s] ?? 0)) / total) })
  );
  const stageCounts = {};
  projects.forEach((p) => {
    const st = p.lifecycle || "Execution";
    stageCounts[st] = (stageCounts[st] ?? 0) + 1;
  });
  const stageOrder = ["Initiation", "Solutioning", "Procurement", "Execution", "Closing"];
  const lifecycleStages = stageOrder
    .filter((s) => (stageCounts[s] ?? 0) > 0)
    .concat(Object.keys(stageCounts).filter((s) => !stageOrder.includes(s)))
    .map((s) => ({ stage: s, value: stageCounts[s] ?? 0 }));

  return {
    kpis: [
      { id: "onTrackRate", label: "OnTrack Rate", value: onTrack / total, unit: "%", description: "Projects currently on track" },
      { id: "majorDelayRate", label: "Major Delay Rate", value: majorDelay / total, unit: "%", description: "Projects significantly delayed" },
      { id: "slightlyDelayRate", label: "Slightly Delay Rate", value: slightlyDelay / total, unit: "%", description: "Projects with minor delays" },
      { id: "totalProjects", label: "Total Projects", value: projects.length, unit: "", description: "Total active projects" }
    ],
    statusOverview,
    lifecycleStages
  };
}

function renderProjects(projects, activeTab) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  const filtered =
    activeTab && activeTab !== "All"
      ? projects.filter((p) =>
          activeTab === "Delayed"
            ? p.status === "Delayed" || p.status === "Slightly Delayed"
            : p.status === activeTab
        )
      : projects;

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "projects-empty";
    empty.innerHTML = `
      <p class="projects-empty-text">No projects match the current filters.</p>
      <p class="projects-empty-hint">Try adjusting your filter selection.</p>
    `;
    grid.appendChild(empty);
  } else {
    filtered.forEach((project, index) => {
      const card = createProjectCard(project);
      card.style.animationDelay = `${index * 25}ms`;
      grid.appendChild(card);
    });
  }
}

let currentFilteredProjects = [];
let allProjectsData = [];

function attachProjectTabHandlers() {
  const container = document.getElementById("projects-tabs");
  container.addEventListener("click", (event) => {
    const button = event.target.closest(".projects-tab");
    if (!button) return;
    const active = container.querySelector(".projects-tab.is-active");
    if (active) active.classList.remove("is-active");
    button.classList.add("is-active");
    renderProjects(currentFilteredProjects, button.dataset.tab);
  });
}

/* Donut segment separator: approved palette, thin dark stroke between segments */
const DONUT_GAP_DEG = 2;
const DONUT_GAP_COLOR = "#333333";

/* Segment order (clockwise from 12 o'clock) to match reference */
const DONUT_SEGMENT_ORDER = [
  "On Track",
  "Slightly Delayed",
  "On Hold",
  "Closing",
  "Completed",
  "Cancelled"
];

function renderStatusOverview(statusOverview) {
  const ordered = [...statusOverview].sort(
    (a, b) =>
      DONUT_SEGMENT_ORDER.indexOf(a.status) - DONUT_SEGMENT_ORDER.indexOf(b.status)
  );
  const total = ordered.reduce((sum, item) => sum + item.value, 0) || 1;
  const donut = document.getElementById("status-donut");
  const labelsContainer = document.getElementById("status-donut-labels");
  const legend = document.getElementById("status-legend");

  legend.innerHTML = "";
  if (labelsContainer) labelsContainer.innerHTML = "";

  const n = ordered.length;
  const totalGapDeg = n * DONUT_GAP_DEG;
  const totalSegmentDeg = 360 - totalGapDeg;

  const segments = [];
  let curAngle = 0;

  ordered.forEach((item) => {
    const share = item.value / total;
    const color = STATUS_COLORS[item.status] ?? "#666666";
    const angleDeg = share * totalSegmentDeg;
    const startAngle = curAngle + DONUT_GAP_DEG;
    const endAngle = startAngle + angleDeg;
    const midAngle = startAngle + angleDeg / 2;

    segments.push({ color, angleDeg, value: item.value, midAngle, startAngle, endAngle });

    curAngle += DONUT_GAP_DEG + angleDeg;

    const swatchStyle = `background:${color};`;

    const statusDisplay =
      { "On Hold": "OnHold", "On Track": "OnTrack", "Slightly Delayed": "Slightly Del" }[
        item.status
      ] ?? item.status;
    const li = document.createElement("li");
    li.className = "legend-item";
    li.innerHTML = `
      <div class="legend-left">
        <span class="legend-swatch" style="${swatchStyle}"></span>
        <span class="legend-label">${statusDisplay}</span>
      </div>
    `;
    legend.appendChild(li);
  });

  let cur = 0;
  const stops = [];
  segments.forEach((s) => {
    stops.push(`${DONUT_GAP_COLOR} ${cur.toFixed(2)}deg`);
    cur += DONUT_GAP_DEG;
    stops.push(`${DONUT_GAP_COLOR} ${cur.toFixed(2)}deg`);
    stops.push(`${s.color} ${cur.toFixed(2)}deg`);
    cur += s.angleDeg;
    stops.push(`${s.color} ${cur.toFixed(2)}deg`);
  });
  if (cur < 360) {
    stops.push(`${DONUT_GAP_COLOR} ${cur.toFixed(2)}deg`);
    stops.push(`${DONUT_GAP_COLOR} 360deg`);
  }

  donut.style.background = `conic-gradient(from 0deg, ${stops.join(", ")})`;

  const wrapper = donut.closest(".donut-wrapper");
  const chartLayout = donut.closest(".chart-layout--status");

  if (labelsContainer && wrapper && chartLayout) {
    segments.forEach(({ value, midAngle }, index) => {
      const label = document.createElement("span");
      label.className = "donut-segment-label";
      label.dataset.segment = String(index);
      label.style.transform = `rotate(${midAngle}deg) translateY(-62px)`;
      label.innerHTML = `<span class="donut-segment-label-inner" style="transform: rotate(-${midAngle}deg)">${value}%</span>`;
      labelsContainer.appendChild(label);
    });

    function getAngleFromCenter(ev) {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      const rad = Math.atan2(dx, -dy);
      return ((rad * 180) / Math.PI + 360) % 360;
    }

    function getSegmentIndex(angle) {
      for (let i = 0; i < segments.length; i++) {
        const { startAngle, endAngle } = segments[i];
        if (angle >= startAngle && angle < endAngle) return i;
      }
      return -1;
    }

    wrapper.addEventListener("mousemove", (ev) => {
      const angle = getAngleFromCenter(ev);
      const idx = getSegmentIndex(angle);
      chartLayout.dataset.hoveredSegment = idx >= 0 ? String(idx) : "";
    });

    wrapper.addEventListener("mouseleave", () => {
      chartLayout.removeAttribute("data-hovered-segment");
    });
  }
}

function renderLifecycleChart(stages) {
  const container = document.getElementById("lifecycle-chart");
  container.innerHTML = "";
  container.style.setProperty("--lifecycle-cols", String(stages.length));

  const dataMax = stages.reduce(
    (currentMax, stage) => Math.max(currentMax, stage.value),
    1
  );
  // Nice Y-axis scale: round up to nearest 20 (e.g. 46 → 60)
  const yMax = Math.max(20, Math.ceil(dataMax / 20) * 20);
  const yTicks = [0, Math.round(yMax / 3), Math.round((2 * yMax) / 3), yMax].filter(
    (v, i, a) => a.indexOf(v) === i
  ).sort((a, b) => a - b);

  const inner = document.createElement("div");
  inner.className = "lifecycle-chart-inner";

  const yAxis = document.createElement("div");
  yAxis.className = "lifecycle-y-axis";
  yTicks.forEach((tick) => {
    const label = document.createElement("span");
    label.className = "lifecycle-y-label";
    label.textContent = `${tick}.`;
    yAxis.appendChild(label);
  });

  const chartArea = document.createElement("div");
  chartArea.className = "lifecycle-chart-area";

  const grid = document.createElement("div");
  grid.className = "lifecycle-grid";
  yTicks.forEach(() => {
    const line = document.createElement("div");
    line.className = "lifecycle-grid-line";
    grid.appendChild(line);
  });

  const barsWrap = document.createElement("div");
  barsWrap.className = "lifecycle-bars";
  stages.forEach((stage) => {
    const pct = (stage.value / yMax) * 100;
    const bar = document.createElement("div");
    bar.className = "lifecycle-bar";
    const fill = document.createElement("div");
    fill.className = "lifecycle-bar-fill";
    fill.style.height = `${Math.max(pct, 2)}%`;
    bar.appendChild(fill);
    barsWrap.appendChild(bar);
  });

  chartArea.appendChild(grid);
  chartArea.appendChild(barsWrap);

  const xLabels = document.createElement("div");
  xLabels.className = "lifecycle-x-labels";
  stages.forEach((stage) => {
    const label = document.createElement("div");
    label.className = "lifecycle-x-label";
    label.textContent = stage.stage;
    xLabels.appendChild(label);
  });

  inner.appendChild(yAxis);
  inner.appendChild(chartArea);
  container.appendChild(inner);
  container.appendChild(xLabels);
}

async function initDashboard() {
  const data = await loadDashboardData();
  if (!data) return;

  const filtersSource = data.filters ?? {};

  /* Projects Tracker panel: exactly these 5 filters */
  const projectTabs = [
    "All",
    "On Hold",
    "Delayed",
    "On Track",
    "Closing"
  ];

  const allProjects = (data.projects ?? []).map((p) => ({
    ...p,
    id: p.id,
    name: p.name,
    department: p.department,
    portfolio: p.portfolio ?? "",
    status: p.status,
    lifecycle: p.lifecycleStage,
    manager: p.projectManager,
    plannedProgress: (p.plannedProgress ?? 0) / 100,
    actualProgress: (p.actualProgress ?? 0) / 100
  }));
  allProjectsData = allProjects;

  const filterState = {
    businessUnit: "All",
    portfolio: "All",
    projectManager: "All",
    projectStatus: "All",
    lifecycleStage: "All"
  };

  const filtersWithOptions = [
    { id: "businessUnit", label: "Business Unit", options: filtersSource.businessUnits ?? ["All"] },
    { id: "portfolio", label: "Portfolio", options: filtersSource.portfolios ?? ["All"] },
    { id: "projectManager", label: "Project Manager", options: filtersSource.projectManagers ?? ["All"] },
    { id: "projectStatus", label: "Project Status", options: filtersSource.projectStatus ?? ["All"] },
    { id: "lifecycleStage", label: "Lifecycle Stage", options: filtersSource.lifecycleStage ?? ["All"] }
  ];

  function refreshDashboard() {
    const filtered = applyFilters(allProjects, filterState);
    currentFilteredProjects = filtered;
    const derived = computeDerivedFromProjects(filtered);

    renderFilters(filtersWithOptions, filterState, (filterId, value) => {
      filterState[filterId] = value;
      refreshDashboard();
    });
    renderKpis(derived.kpis);
    renderProjectTabs(projectTabs);
    renderProjects(filtered, "All");
    renderStatusOverview(derived.statusOverview);
    renderLifecycleChart(derived.lifecycleStages);
    requestAnimationFrame(() => requestAnimationFrame(alignProjectsPanelToLifecycle));
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-chip-wrap")) closeFilterDropdowns();
    if (e.target.id === "project-modal-backdrop" || e.target.closest("#modal-close")) closeProjectModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFilterDropdowns();
      closeProjectModal();
    }
  });

  document.getElementById("projects-grid")?.addEventListener("click", (e) => {
    const menuBtn = e.target.closest(".project-menu");
    if (!menuBtn) return;
    e.preventDefault();
    e.stopPropagation();
    const card = menuBtn.closest(".project-card");
    if (!card) return;
    const id = parseInt(card.dataset.projectId, 10);
    const project = allProjectsData.find((p) => p.id === id);
    if (project) openProjectModal(project);
  });

  attachProjectTabHandlers();
  refreshDashboard();
}

function alignProjectsPanelToLifecycle() {
  const projectsPanel = document.querySelector(".projects-panel");
  const sidePanelCards = document.querySelector(".side-panel-cards");
  if (!projectsPanel || !sidePanelCards) return;
  const h = sidePanelCards.getBoundingClientRect().height;
  projectsPanel.style.height = `${h}px`;
}

window.addEventListener("DOMContentLoaded", initDashboard);
window.addEventListener("resize", alignProjectsPanelToLifecycle);

