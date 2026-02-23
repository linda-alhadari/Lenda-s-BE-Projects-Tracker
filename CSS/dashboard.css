:root {
  /* Approved palette only */
  --black: #000000;
  --gray-dark: #333333;
  --gray-mid: #444444;
  --gray-soft: #666666;
  --white: #FFFFFF;
  --gray-light: #E5E7EB;
  --gold: #B4A56F;
  --gold-30: rgba(180, 165, 111, 0.3);
  --brown: #8B7355;
  --overlay: rgba(0, 0, 0, 0.4);
  /* Glass widget backgrounds – deeper, richer dark tone */
  --glass-bg: rgba(22, 22, 22, 0.72);
  --glass-bg-panel: rgba(20, 20, 20, 0.68);
  --glass-bg-chart: rgba(0, 0, 0, 0.5);
  /* Semantic (from palette) */
  --bg: var(--black);
  --text-main: var(--white);
  --text-soft: var(--gray-light);
  --text-muted: var(--gray-soft);
  --accent: var(--gold);
  --border-subtle: var(--gray-mid);
  --glass-border: var(--gray-mid);
  --glass-border-gold: var(--gold-30);
  --glass-shadow: 0 8px 32px var(--overlay);
  --glass-inner-glow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
  --radius-lg: 18px;
  --radius-md: 14px;
  --radius-pill: 999px;
  --transition-fast: 150ms ease-out;
  --glass-blur: 16px;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Inter", "Segoe UI", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: var(--font-sans);
  background: url("../img/background.png") no-repeat center center fixed;
  background-size: cover;
  background-color: #000000;
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  min-height: 100vh;
  padding: 24px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  height: 46px;
  width: auto;
  display: block;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px var(--gray-mid), 0 8px 24px var(--overlay);
}

.brand-icon {
  width: 22px;
  height: 14px;
  border-radius: 10px;
  border: 2px solid var(--gray-dark);
  background: transparent;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-weight: 700;
  letter-spacing: 0.18em;
  font-size: 12px;
  text-transform: uppercase;
}

.brand-subtitle {
  font-size: 11px;
  color: var(--text-soft);
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.filter-chip {
  position: relative;
  min-width: 168px;
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(24, 24, 24, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.03), 0 2px 8px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: border-color 200ms ease-out, background 200ms ease-out,
    box-shadow 200ms ease-out, transform 150ms ease-out;
}

.filter-chip:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(68, 68, 68, 0.5);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}

.filter-chip:focus-visible {
  outline: none;
  border-color: rgba(180, 165, 111, 0.25);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.04), 0 0 0 2px rgba(180, 165, 111, 0.12);
}

.filter-chip-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-soft);
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.filter-chip-value {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 20px;
}

.filter-chevron {
  flex-shrink: 0;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--text-soft);
  margin-left: 2px;
  opacity: 0.85;
}

.filter-chip-wrap {
  position: relative;
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  max-height: 240px;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(24, 24, 24, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 6px 0;
}

.filter-dropdown-option {
  display: block;
  width: 100%;
  padding: 8px 14px;
  border: none;
  background: none;
  color: var(--text-main);
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease;
  font-family: inherit;
}

.filter-dropdown-option:hover {
  background: rgba(255, 255, 255, 0.08);
}

.filter-dropdown-option.is-selected {
  color: var(--accent);
  background: rgba(180, 165, 111, 0.12);
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.action-btn {
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(24, 24, 24, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.03), 0 2px 8px rgba(0, 0, 0, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-main);
  transition: border-color 200ms ease-out, background 200ms ease-out,
    box-shadow 200ms ease-out, color 200ms ease-out;
}

.action-btn:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(68, 68, 68, 0.5);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.25);
}

.action-btn:focus-visible {
  outline: none;
  border-color: rgba(180, 165, 111, 0.25);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.04), 0 0 0 2px rgba(180, 165, 111, 0.12);
}

.action-btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--text-soft);
}

/* Sidebar: smaller Share/Download under lifecycle chart */
.action-buttons--sidebar {
  margin-top: 14px;
  gap: 8px;
}

.action-buttons--sidebar .action-btn {
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 11px;
}

.action-buttons--sidebar .action-btn-icon {
  width: 14px;
  height: 14px;
}

/* KPI row */

/* Align with content-grid: first 3 KPIs over projects panel (2.4fr), 4th over side panel (1.35fr) */
.kpi-row {
  display: grid;
  grid-template-columns: 0.8fr 0.8fr 0.8fr 1.35fr;
  gap: 10px;
}

.kpi-card {
  position: relative;
  border-radius: var(--radius-md);
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(180, 165, 111, 0.1);
  box-shadow: var(--glass-inner-glow), 0 6px 24px var(--overlay), 0 0 32px rgba(180, 165, 111, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 28px;
}

.kpi-label {
  font-size: 11px;
  color: var(--text-soft);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.kpi-icon-wrap {
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  border-radius: 8px;
  background: rgba(180, 165, 111, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
}

.kpi-icon-wrap svg {
  display: block;
  color: inherit;
  width: 14px;
  height: 14px;
}

.kpi-main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
}

.kpi-value-wrap {
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.kpi-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.kpi-unit {
  font-size: 11px;
  color: var(--gray-soft);
  font-weight: 500;
}

.kpi-sub {
  font-size: 10px;
  color: var(--text-soft);
  line-height: 1.35;
  margin: 0;
}

/* Main content layout */

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.4fr) minmax(0, 1.35fr);
  gap: 16px;
  margin-top: 4px;
  flex: 1 1 auto;
  min-height: 0;
  align-items: start;
}

.projects-panel {
  background: var(--glass-bg-panel);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: 22px;
  border: 1px solid var(--gray-mid);
  box-shadow: var(--glass-inner-glow), var(--glass-shadow);
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  box-sizing: border-box;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.panel-title {
  margin: 0;
  font-size: 14px;
}

.panel-subtitle {
  margin: 3px 0 0;
  font-size: 11px;
  color: var(--text-soft);
}

.projects-tracker-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;
}

.projects-tracker-scroll::-webkit-scrollbar {
  width: 6px;
}

.projects-tracker-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.projects-tracker-scroll::-webkit-scrollbar-thumb {
  background: var(--gray-mid);
  border-radius: 3px;
}

.projects-tabs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px;
  border-radius: 999px;
  background: var(--black);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--gray-mid);
  box-shadow: inset 0 1px 0 0 var(--gray-mid);
}

.projects-tab {
  border: none;
  background: transparent;
  color: var(--text-soft);
  font-size: 11px;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.projects-tab.is-active {
  background: var(--gold);
  color: #000000;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.project-card {
  background: rgba(40, 40, 40, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.04);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.project-title-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.project-name {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.3;
}

.project-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.project-meta {
  font-size: 10px;
  color: var(--text-soft);
  opacity: 0.9;
}

.project-badge {
  font-size: 9px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 3px;
  background: rgba(68, 68, 68, 0.9);
  color: var(--gray-light);
}

.project-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.project-status-pill {
  font-size: 11px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.01em;
  background: transparent;
}

.status-ontrack {
  color: #22c55e;
}

.status-delayed {
  color: #ef4444;
}

.status-onhold {
  color: var(--gold);
}

.status-closing {
  color: var(--gray-light);
}

.project-menu {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  color: var(--text-soft);
  opacity: 0.75;
  transition: background var(--transition-fast), color var(--transition-fast), opacity var(--transition-fast);
}

.project-menu:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-main);
  opacity: 1;
}

.project-menu-dot {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: currentColor;
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 2px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.project-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-soft);
  opacity: 0.9;
}

.project-row strong {
  color: var(--text-main);
  font-weight: 500;
}

.progress-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-labels {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 10px;
}

.progress-label-name {
  color: var(--text-soft);
  opacity: 0.85;
}

.progress-label-value {
  color: var(--gold);
  font-weight: 600;
  font-size: 11px;
}

.progress-label-value-planned {
  color: var(--gray-soft);
}

.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 8px;
  border-radius: 4px;
  overflow: visible;
}

.progress-track {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.12);
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  border-radius: inherit;
  background: var(--gold);
  transition: width 0.25s ease-out;
}

.progress-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
}

.progress-marker-planned {
  background: var(--gray-soft);
}

.progress-marker-actual {
  background: var(--gold);
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.side-panel-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: 20px;
  border: 1px solid var(--gray-mid);
  box-shadow: var(--glass-inner-glow), var(--glass-shadow),
    inset 0 0 0 1px var(--gold-30);
  padding: 14px 16px 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-title {
  margin: 0;
  font-size: 14px;
}

.side-panel .card-title {
  font-weight: 700;
  color: #FFFFFF;
}

.card-subtitle {
  margin: 2px 0 0;
  font-size: 11px;
  color: var(--text-soft);
}

.chart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  align-items: center;
  gap: 20px;
  padding: 4px 0;
}

.donut-wrapper {
  --donut-size: 160px;
  position: relative;
  width: var(--donut-size);
  height: var(--donut-size);
  flex-shrink: 0;
  margin: 0 auto;
}

/* Donut: hollow center, solid flat segments, no gradients or blur */
.donut {
  --donut-size: 160px;
  --donut-inset: 32px;
  width: var(--donut-size);
  height: var(--donut-size);
  border-radius: 50%;
  position: relative;
  background: conic-gradient(from 0deg, var(--gray-dark) 0deg, var(--gray-dark) 360deg);
  box-shadow: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.donut::before {
  content: "";
  position: absolute;
  inset: var(--donut-inset);
  border-radius: 50%;
  background: var(--black);
  box-shadow: none;
  z-index: 1;
}

.donut-labels {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--donut-size);
  height: var(--donut-size);
  margin-left: calc(var(--donut-size) / -2);
  margin-top: calc(var(--donut-size) / -2);
  pointer-events: none;
  z-index: 2;
}

.donut-segment-label {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2.5em;
  margin-left: -1.25em;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.2;
}

.donut-segment-label-inner {
  display: block;
  white-space: nowrap;
}

.legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}

.legend-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-swatch-line {
  background: none;
  width: 4px;
  min-width: 4px;
  border-left: 3px solid;
  border-radius: 0;
}

.legend-label {
  color: var(--gray-light);
}

.legend-value {
  color: var(--white);
  font-weight: 500;
}

/* Projects by Lifecycle Stage – reference style (dark panel, white grid/labels, khaki bars) */
.bar-chart {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lifecycle-chart-inner {
  display: flex;
  gap: 14px;
  align-items: stretch;
  min-height: 160px;
}

.lifecycle-y-axis {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding: 0 10px 28px 0;
  min-width: 32px;
  flex-shrink: 0;
}

.lifecycle-y-label {
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.lifecycle-chart-area {
  position: relative;
  flex: 1;
  min-height: 140px;
  min-width: 0;
  background: #0f0f0f;
  border-radius: 14px;
  padding: 0;
  overflow: hidden;
}

.lifecycle-grid {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 14px 28px;
  border-radius: inherit;
}

.lifecycle-grid-line {
  border-top: 1px solid #FFFFFF;
  width: 100%;
  flex-shrink: 0;
  opacity: 0.9;
}

.lifecycle-grid-line:first-child {
  border-top-color: #FFFFFF;
  border-top-width: 1px;
}

.lifecycle-bars {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  align-items: flex-end;
  padding: 0 14px 28px;
  box-sizing: border-box;
}

.lifecycle-bar {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 4px;
}

.lifecycle-bar-fill {
  width: 100%;
  max-width: 44px;
  min-height: 4px;
  border-radius: 0;
  background: var(--gold);
  border: none;
  box-shadow: none;
}

.lifecycle-x-labels {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 10px 14px 0 46px;
  margin-top: 0;
  align-items: start;
}

.lifecycle-x-label {
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.35;
}

/* Responsiveness */

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1.4fr);
  }

  .kpi-row {
    grid-template-columns: 0.566fr 0.566fr 0.566fr 1.4fr;
  }

  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .app-shell {
    padding: 20px 16px 18px;
  }

  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .kpi-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .projects-tabs {
    width: 100%;
    justify-content: space-between;
  }
}

