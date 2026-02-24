import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getCurrentNote from "../hooks/getCurrentNotes";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

/* ═══════════════════════════════════════════════════
    GLOBAL STYLES
═══════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --bg:           #0c0c10;
    --surface:      #13131a;
    --surface2:     #1a1a24;
    --surface3:     #22222f;
    --border:       #2a2a3a;
    --border2:      #353548;
    --ink:          #e8e6f0;
    --ink2:         #9896a8;
    --ink3:         #5c5a70;
    --gold:         #f5c842;
    --gold-dim:     rgba(245,200,66,0.1);
    --crimson:      #e05c5c;
    --crimson-dim:  rgba(224,92,92,0.1);
    --emerald:      #5ce0a0;
    --emerald-dim:  rgba(92,224,160,0.08);
    --violet:       #a78bfa;
    --violet-dim:   rgba(167,139,250,0.08);
    --sky:          #60c8f5;
    --r:            6px;
    --r2:           10px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sn-app {
    display: flex;
    height: 100vh;
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
    color: var(--ink);
    overflow: hidden;
  }

  .sn-sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.3s, min-width 0.3s;
  }

  .sn-sidebar.collapsed { width: 0; min-width: 0; border-right: none; }

  .sn-sidebar-brand {
    padding: 20px 18px 14px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sn-brand-icon {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--gold), #d4a017);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }

  .sn-brand-text {
    font-family: 'Fraunces', serif;
    font-size: 16px; font-weight: 600;
    color: var(--ink); letter-spacing: -0.02em;
  }

  .sn-brand-sub {
    font-size: 9px; color: var(--ink3);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.15em; text-transform: uppercase; margin-top: 1px;
  }

  .sn-nav { padding: 10px 8px; flex: 1; overflow-y: auto; }

  .sn-nav-section {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink3); padding: 10px 10px 6px;
  }

  .sn-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: var(--r);
    cursor: pointer; font-size: 13px; color: var(--ink2);
    transition: all 0.15s; margin-bottom: 2px;
    border: 1px solid transparent;
  }

  .sn-nav-item:hover { background: var(--surface2); color: var(--ink); }

  .sn-nav-item.active {
    background: var(--gold-dim); color: var(--gold);
    border-color: rgba(245,200,66,0.18);
  }

  .sn-nav-item.exam-active {
    background: var(--crimson-dim); color: var(--crimson);
    border-color: rgba(224,92,92,0.2);
  }

  .sn-nav-item.chat-active {
    background: var(--violet-dim); color: var(--violet);
    border-color: rgba(167,139,250,0.2);
  }

  .sn-nav-icon { font-size: 14px; }
  .sn-nav-badge {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; padding: 2px 6px;
    border-radius: 99px; background: var(--crimson-dim);
    color: var(--crimson); letter-spacing: 0.05em;
  }

  .sn-sidebar-footer {
    padding: 14px 18px;
    border-top: 1px solid var(--border);
  }

  .sn-meta-topic {
    font-family: 'Fraunces', serif;
    font-size: 13px; font-weight: 600;
    color: var(--ink); margin-bottom: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .sn-meta-sub {
    font-size: 10px; color: var(--ink3);
    font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em;
  }

  .sn-main {
    flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;
  }

  .sn-topbar {
    height: 52px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 20px;
    gap: 10px; background: var(--surface); flex-shrink: 0;
  }

  .sn-menu-btn {
    background: none; border: none; color: var(--ink2);
    cursor: pointer; font-size: 18px; padding: 4px 6px;
    border-radius: 4px; transition: all 0.15s;
  }

  .sn-menu-btn:hover { background: var(--surface2); color: var(--ink); }

  .sn-topbar-title {
    font-family: 'Fraunces', serif;
    font-size: 17px; font-weight: 600;
    color: var(--ink); flex: 1;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .sn-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 11px; font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.05em; border: 1px solid; white-space: nowrap;
  }

  .sn-pill-gold    { background: var(--gold-dim);    color: var(--gold);    border-color: rgba(245,200,66,0.25); }
  .sn-pill-crimson { background: var(--crimson-dim); color: var(--crimson); border-color: rgba(224,92,92,0.25); }
  .sn-pill-violet  { background: var(--violet-dim);  color: var(--violet);  border-color: rgba(167,139,250,0.25); }

  .sn-mode-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: var(--r); color: var(--ink2);
    cursor: pointer; font-size: 12px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s; white-space: nowrap;
  }

  .sn-mode-btn:hover { background: var(--surface3); color: var(--ink); }
  .sn-mode-btn.on { background: var(--crimson-dim); border-color: rgba(224,92,92,0.3); color: var(--crimson); }

  .sn-content {
    flex: 1; overflow-y: auto; padding: 28px 36px 60px;
    scrollbar-width: thin; scrollbar-color: var(--border) transparent;
  }

  .sn-content::-webkit-scrollbar { width: 4px; }
  .sn-content::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

  .sn-block { margin-bottom: 40px; animation: snUp 0.4s ease both; }

  @keyframes snUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sn-block-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }

  .sn-block-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ink3); white-space: nowrap;
  }

  .sn-block-rule { flex: 1; height: 1px; background: var(--border); }

  .sn-section-title {
    font-family: 'Fraunces', serif;
    font-size: 20px; font-weight: 600;
    color: var(--ink); margin-bottom: 14px; letter-spacing: -0.01em;
  }

  .sn-insight {
    background: linear-gradient(135deg, var(--surface2), var(--surface3));
    border: 1px solid var(--border2); border-left: 3px solid var(--gold);
    border-radius: var(--r2); padding: 20px 24px;
    font-size: 14.5px; line-height: 1.75; color: var(--ink2);
  }

  .sn-insight strong { color: var(--gold); font-weight: 600; }

  .sn-star-group { margin-bottom: 24px; }

  .sn-star-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
  }

  .sn-star-emoji { font-size: 14px; letter-spacing: 2px; }

  .sn-star-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
  }

  .sn-point {
    display: flex; gap: 12px;
    padding: 12px 16px; margin-bottom: 6px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--r); font-size: 13.5px; line-height: 1.65;
    color: var(--ink2); transition: all 0.15s; cursor: default;
  }

  .sn-point:hover { background: var(--surface3); border-color: var(--border2); color: var(--ink); }
  .sn-point strong { color: var(--ink); font-weight: 600; }

  .sn-point-dot {
    width: 5px; height: 5px; border-radius: 50%;
    flex-shrink: 0; margin-top: 8px;
  }

  .katex { font-size: 1.1em; color: inherit; }

  .sn-rev-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }

  .sn-rev-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--r2); padding: 16px;
    font-size: 13px; line-height: 1.6; color: var(--ink2);
    transition: all 0.15s;
  }

  .sn-rev-card:hover { border-color: var(--violet); background: var(--surface3); }

  .sn-rev-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: var(--violet); margin-bottom: 6px; letter-spacing: 0.1em;
  }

  .sn-diagram {
    background: #080810; border: 1px solid var(--border); border-radius: var(--r2);
    padding: 22px; font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px; line-height: 1.8; color: #7ee8a2;
    overflow-x: auto; white-space: pre;
  }

  /* Mermaid diagram container */
  .sn-mermaid-wrap {
    background: #080810;
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 28px 24px;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: auto;
  }

  .sn-mermaid-wrap svg {
    max-width: 100%;
    height: auto;
  }

  .sn-mermaid-loading {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink3);
  }

  .sn-table-wrap { overflow-x: auto; border-radius: var(--r2); border: 1px solid var(--border); }
  .sn-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .sn-table th {
    background: var(--surface3); color: var(--ink2);
    padding: 11px 16px; text-align: left;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
    font-weight: 500; border-bottom: 1px solid var(--border2);
  }
  .sn-table td {
    padding: 11px 16px; border-bottom: 1px solid var(--border);
    color: var(--ink2); line-height: 1.5;
  }
  .sn-table tr:last-child td { border-bottom: none; }
  .sn-table tr:hover td { background: var(--surface2); color: var(--ink); }
  .sn-table td strong { color: var(--gold); }

  .sn-q-list { display: flex; flex-direction: column; gap: 8px; }
  .sn-q-card {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 13px 16px; background: var(--surface2);
    border: 1px solid var(--border); border-radius: var(--r);
    transition: all 0.15s;
  }
  .sn-q-card:hover { border-color: var(--border2); background: var(--surface3); }
  .sn-q-num {
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    color: var(--bg); background: var(--emerald);
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 4px; flex-shrink: 0; font-weight: 500;
  }
  .sn-q-text { font-size: 13.5px; line-height: 1.6; color: var(--ink2); padding-top: 1px; }

  .sn-reveal { border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; margin-bottom: 8px; transition: border-color 0.2s; }
  .sn-reveal.open { border-color: var(--violet); }
  .sn-reveal-btn {
    width: 100%; display: flex; justify-content: space-between; align-items: center;
    padding: 13px 18px; background: var(--surface2); border: none;
    cursor: pointer; color: var(--ink2); font-size: 13px;
    font-family: 'Outfit', sans-serif; transition: all 0.15s;
  }
  .sn-reveal-btn:hover { background: var(--surface3); color: var(--ink); }
  .sn-reveal-icon { font-size: 18px; transition: transform 0.2s; }
  .sn-reveal.open .sn-reveal-icon { transform: rotate(45deg); }
  .sn-reveal-body {
    padding: 14px 18px; font-size: 13.5px; line-height: 1.7;
    background: var(--violet-dim); border-top: 1px solid rgba(167,139,250,0.15);
    color: var(--ink2); animation: snUp 0.2s ease both;
  }

  /* ── Graph System ─────────────────────────────── */
  .sn-graph-shell {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 16px;
    position: relative;
  }

  .sn-graph-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top left, rgba(167,139,250,0.04) 0%, transparent 60%),
                radial-gradient(ellipse at bottom right, rgba(245,200,66,0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .sn-graph-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 22px 12px;
    border-bottom: 1px solid var(--border);
    position: relative; z-index: 1;
  }

  .sn-graph-title {
    font-family: 'Fraunces', serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); letter-spacing: -0.01em;
  }

  .sn-graph-type-tabs {
    display: flex; gap: 4px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 3px;
  }

  .sn-graph-tab {
    display: flex; align-items: center; gap: 5px;
    padding: 4px 10px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    color: var(--ink3);
    border: none;
    background: none;
    transition: all 0.15s;
  }

  .sn-graph-tab:hover { color: var(--ink2); background: var(--surface2); }
  .sn-graph-tab.active { background: var(--surface3); color: var(--violet); }

  .sn-graph-body {
    padding: 20px 22px 22px;
    position: relative; z-index: 1;
  }

  .sn-graph-legend {
    display: flex; flex-wrap: wrap; gap: 12px;
    padding: 0 22px 18px;
    position: relative; z-index: 1;
  }

  .sn-graph-legend-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: var(--ink2);
    font-family: 'JetBrains Mono', monospace;
  }

  .sn-graph-legend-dot {
    width: 8px; height: 8px; border-radius: 2px;
  }

  .sn-graph-stat-row {
    display: grid;
    gap: 8px;
    padding: 0 22px 18px;
    position: relative; z-index: 1;
  }

  .sn-stat-chip {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    display: flex; flex-direction: column; gap: 2px;
  }

  .sn-stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink3);
  }

  .sn-stat-value {
    font-family: 'Fraunces', serif;
    font-size: 18px; font-weight: 600;
    color: var(--ink);
  }

  .sn-tooltip {
    background: #1a1a2e !important;
    border: 1px solid var(--border2) !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 12px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
  }

  .sn-loader {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 14px; min-height: 300px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--ink3);
  }

  .sn-spinner {
    width: 30px; height: 30px;
    border: 2px solid var(--border); border-top-color: var(--violet);
    border-radius: 50%; animation: snSpin 0.8s linear infinite;
  }

  @keyframes snSpin { to { transform: rotate(360deg); } }

  .sn-pie-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    fill: var(--ink2);
  }

  @media (max-width: 900px) {
    .sn-sidebar { display: none; }
    .sn-rev-grid { grid-template-columns: 1fr; }
  }
`;

/* ═══════════════════════════════════════════════════
    PALETTE for series
═══════════════════════════════════════════════════ */
const PALETTE = [
  "#a78bfa",
  "#f5c842",
  "#5ce0a0",
  "#e05c5c",
  "#60c8f5",
  "#f5a623",
  "#c084fc",
  "#34d399",
];

/* ═══════════════════════════════════════════════════
    HELPERS
═══════════════════════════════════════════════════ */
function InjectStyles() {
  useEffect(() => {
    const id = "sn-global-v4";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

function Bold({ text }) {
  const str = typeof text === "string" ? text : String(text ?? "");
  const parts = str.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('$$') && part.endsWith('$$'))
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        if (part.startsWith('$') && part.endsWith('$')) {
          try { return <InlineMath key={i} math={part.slice(1, -1)} />; }
          catch { return <code key={i} style={{ color: 'var(--crimson)' }}>{part}</code>; }
        }
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function safeStr(val) {
  if (typeof val === "string") return val;
  if (val == null) return "";
  return String(val);
}

function parseMarkdownTable(src) {
  const lines = safeStr(src).trim().split("\n").filter(l => !l.match(/^[\s|:-]+$/));
  if (lines.length < 2) return null;
  const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean);
  const rows = lines.slice(1).map(l => l.split("|").map(c => c.trim()).filter(Boolean));
  return { headers, rows };
}

function tableToChartData(parsed) {
  if (!parsed) return null;
  const { headers, rows } = parsed;
  const series = headers.slice(1);
  const data = rows.map(row => {
    const entry = { name: row[0] || "" };
    series.forEach((s, i) => {
      const raw = row[i + 1];
      const num = parseFloat(String(raw).replace(/[^0-9.\-]/g, ""));
      entry[s] = isNaN(num) ? raw : num;
    });
    return entry;
  });
  const isNumeric = series.every(s => data.every(d => typeof d[s] === "number"));
  return isNumeric ? { series, data } : null;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a1a2e', border: '1px solid #353548',
      borderRadius: 8, padding: '10px 14px',
      fontFamily: 'Outfit, sans-serif', fontSize: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
    }}>
      <p style={{ color: '#5c5a70', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: '2px 0' }}>
          {p.name}: <strong style={{ color: '#e8e6f0' }}>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

const renderPieLabel = ({ cx, cy, midAngle, outerRadius, name, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = outerRadius + 24;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  if (percent < 0.04) return null;
  return (
    <text x={x} y={y} fill="#9896a8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"
      style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
};

/* ═══════════════════════════════════════════════════
    MERMAID DIAGRAM COMPONENT  ← FIXED
═══════════════════════════════════════════════════ */
let _mermaidCounter = 0;

function MermaidDiagram({ src }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);           // stable div for the rendered SVG
  const idRef = useRef(null);
  const [phase, setPhase] = useState("idle"); // "idle" | "loading" | "done" | "error"

  // Assign a stable unique ID once
  if (idRef.current === null) {
    idRef.current = `sn-mermaid-${++_mermaidCounter}`;
  }

  useEffect(() => {
    let cancelled = false;
    setPhase("loading");

    const MERMAID_CONFIG = {
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        background: "#080810",
        primaryColor: "#22222f",
        primaryTextColor: "#e8e6f0",
        primaryBorderColor: "#2a2a3a",
        lineColor: "#a78bfa",
        secondaryColor: "#1a1a24",
        tertiaryColor: "#13131a",
        edgeLabelBackground: "#13131a",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "13px",
        nodeBorder: "#353548",
        clusterBkg: "#13131a",
        titleColor: "#e8e6f0",
        arrowheadColor: "#a78bfa",
      },
    };

    const doRender = () => {
      if (cancelled) return;
      try {
        window.mermaid.initialize(MERMAID_CONFIG);
        window.mermaid
          .render(idRef.current, safeStr(src))
          .then(({ svg }) => {
            if (cancelled) return;
            if (svgRef.current) {
              svgRef.current.innerHTML = svg;
            }
            setPhase("done");
          })
          .catch(() => {
            if (!cancelled) setPhase("error");
          });
      } catch {
        if (!cancelled) setPhase("error");
      }
    };

    if (window.mermaid) {
      doRender();
    } else {
      const existing = document.getElementById("sn-mermaid-cdn");
      if (existing) {
        // Script already injected but may not have fired yet
        existing.addEventListener("load", doRender, { once: true });
      } else {
        const script = document.createElement("script");
        script.id = "sn-mermaid-cdn";
        script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
        script.addEventListener("load", doRender, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => { cancelled = true; };
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "error") {
    return <pre className="sn-diagram">{safeStr(src)}</pre>;
  }

  return (
    <div className="sn-mermaid-wrap" ref={containerRef}>
      {phase === "loading" && (
        <span className="sn-mermaid-loading">Rendering diagram…</span>
      )}
      {/* svgRef div is always mounted so mermaid can write into it */}
      <div ref={svgRef} style={{ width: "100%", display: phase === "loading" ? "none" : "block" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
    SMART GRAPH COMPONENT
═══════════════════════════════════════════════════ */
const CHART_TYPES = [
  { id: "bar",   icon: "▊", label: "Bar" },
  { id: "line",  icon: "╱", label: "Line" },
  { id: "pie",   icon: "◔", label: "Pie" },
  { id: "radar", icon: "◈", label: "Radar" },
];

function SmartGraph({ src, index }) {
  const parsed = parseMarkdownTable(src);
  const chartInfo = tableToChartData(parsed);
  const [chartType, setChartType] = useState("bar");

  if (!chartInfo) {
    return <NiceTable src={src} />;
  }

  const { series, data } = chartInfo;
  const title = parsed.headers[0] || `Chart ${index + 1}`;

  const stats = series.map(s => {
    const vals = data.map(d => d[s]).filter(v => typeof v === "number");
    return {
      key: s,
      max: Math.max(...vals),
      min: Math.min(...vals),
      avg: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
    };
  });

  const axisStyle = { fill: "#5c5a70", fontFamily: "JetBrains Mono, monospace", fontSize: 10 };
  const gridStyle = { stroke: "#2a2a3a", strokeDasharray: "3 3" };

  function renderChart() {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 4, right: 16, left: -8, bottom: 4 }} barCategoryGap="28%">
            <CartesianGrid {...gridStyle} vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: "#2a2a3a" }} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(167,139,250,0.05)" }} />
            {series.map((s, i) => (
              <Bar key={s} dataKey={s} fill={PALETTE[i % PALETTE.length]} radius={[4, 4, 0, 0]} maxBarSize={52} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 4, right: 16, left: -8, bottom: 4 }}>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: "#2a2a3a" }} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {series.map((s, i) => (
              <Line key={s} type="monotone" dataKey={s} stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={2}
                dot={{ r: 4, fill: PALETTE[i % PALETTE.length], strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === "pie") {
      const pieData = data.map((d, i) => ({
        name: d.name, value: d[series[0]], color: PALETTE[i % PALETTE.length],
      }));
      return (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={42}
              dataKey="value" labelLine={false} label={renderPieLabel} paddingAngle={3} strokeWidth={0}>
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    if (chartType === "radar") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius={100}>
            <PolarGrid stroke="#2a2a3a" />
            <PolarAngleAxis dataKey="name"
              tick={{ fill: "#9896a8", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {series.map((s, i) => (
              <Radar key={s} name={s} dataKey={s}
                stroke={PALETTE[i % PALETTE.length]} fill={PALETTE[i % PALETTE.length]}
                fillOpacity={0.12} strokeWidth={2} />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      );
    }
  }

  return (
    <div className="sn-graph-shell">
      <div className="sn-graph-header">
        <div className="sn-graph-title">{title}</div>
        <div className="sn-graph-type-tabs">
          {CHART_TYPES.map(ct => (
            <button key={ct.id} className={`sn-graph-tab${chartType === ct.id ? " active" : ""}`}
              onClick={() => setChartType(ct.id)} title={ct.label}>
              <span>{ct.icon}</span><span>{ct.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="sn-graph-body">{renderChart()}</div>
      {series.length > 1 && (
        <div className="sn-graph-legend">
          {series.map((s, i) => (
            <div key={s} className="sn-graph-legend-item">
              <div className="sn-graph-legend-dot" style={{ background: PALETTE[i % PALETTE.length] }} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
      <div className="sn-graph-stat-row" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length * 3, 6)}, 1fr)` }}>
        {stats.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className="sn-stat-chip">
              <span className="sn-stat-label">{s.key} · Max</span>
              <span className="sn-stat-value" style={{ color: PALETTE[i % PALETTE.length] }}>{s.max}</span>
            </div>
            <div className="sn-stat-chip">
              <span className="sn-stat-label">{s.key} · Avg</span>
              <span className="sn-stat-value">{s.avg}</span>
            </div>
            <div className="sn-stat-chip">
              <span className="sn-stat-label">{s.key} · Min</span>
              <span className="sn-stat-value" style={{ color: "#5c5a70" }}>{s.min}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
    SUB-COMPONENTS
═══════════════════════════════════════════════════ */
function Loader() {
  return (
    <div className="sn-loader">
      <div className="sn-spinner" />
      <span>Loading note…</span>
    </div>
  );
}

function NiceTable({ src }) {
  const rows = safeStr(src).trim().split("\n").filter(r => !r.match(/^[\s|:-]+$/));
  if (rows.length < 2) return null;
  const headers = rows[0].split("|").filter(Boolean).map(h => h.trim());
  const body = rows.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()));
  return (
    <div className="sn-table-wrap">
      <table className="sn-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}><Bold text={h} /></th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>{row.map((c, j) => <td key={j}><Bold text={c} /></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RevealCard({ text, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sn-reveal${open ? " open" : ""}`}>
      <button className="sn-reveal-btn" onClick={() => setOpen(!open)}>
        <span>Revision Point {String(index + 1).padStart(2, "0")}</span>
        <span className="sn-reveal-icon">+</span>
      </button>
      {open && (
        <div className="sn-reveal-body"><Bold text={text} /></div>
      )}
    </div>
  );
}

const STAR_CONF = {
  "⭐⭐⭐": { label: "Core — Must Know", color: "#e05c5c" },
  "⭐⭐":   { label: "Important",         color: "#f5a623" },
  "⭐":     { label: "Supplementary",     color: "#9896a8" },
};

/* ═══════════════════════════════════════════════════
    STUDY VIEW
═══════════════════════════════════════════════════ */
function StudyView({ content }) {
  const { note: insight, subTopics, revisonPoint, question, diagram, chart } = content || {};

  return (
    <>
      {insight && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Key Insight</span>
            <div className="sn-block-rule" />
          </div>
          <div className="sn-insight"><Bold text={insight} /></div>
        </div>
      )}

      {subTopics && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Topics by Priority</span>
            <div className="sn-block-rule" />
          </div>
          {["⭐⭐⭐", "⭐⭐", "⭐"].map(star => {
            const arr = subTopics[star];
            if (!arr?.length) return null;
            const conf = STAR_CONF[star];
            return (
              <div key={star} className="sn-star-group">
                <div className="sn-star-header">
                  <span className="sn-star-emoji">{star}</span>
                  <span className="sn-star-tag" style={{ color: conf.color }}>{conf.label}</span>
                </div>
                {arr.map((pt, i) => (
                  <div key={i} className="sn-point">
                    <span className="sn-point-dot" style={{ background: conf.color }} />
                    <span><Bold text={pt} /></span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {revisonPoint?.length > 0 && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Quick Recall</span>
            <div className="sn-block-rule" />
          </div>
          <div className="sn-section-title">Points to Remember</div>
          <div className="sn-rev-grid">
            {revisonPoint.map((pt, i) => (
              <div key={i} className="sn-rev-card">
                <div className="sn-rev-num">Point {String(i + 1).padStart(2, "0")}</div>
                <Bold text={pt} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FIXED: Mermaid diagram instead of <pre> ── */}
      {diagram?.data && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Visual Diagram</span>
            <div className="sn-block-rule" />
          </div>
          <MermaidDiagram src={diagram.data} />
        </div>
      )}

      {chart?.length > 0 && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Data Visualization</span>
            <div className="sn-block-rule" />
          </div>
          {chart.map((c, i) => <SmartGraph key={i} src={c} index={i} />)}
        </div>
      )}

      {(question?.short?.length > 0 || question?.long?.length > 0) && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Practice Questions</span>
            <div className="sn-block-rule" />
          </div>
          {question.short?.length > 0 && (
            <>
              <div className="sn-section-title">Short Answer</div>
              <div className="sn-q-list" style={{ marginBottom: 20 }}>
                {question.short.map((q, i) => (
                  <div key={i} className="sn-q-card">
                    <span className="sn-q-num">{i + 1}</span>
                    <p className="sn-q-text"><Bold text={q} /></p>
                  </div>
                ))}
              </div>
            </>
          )}
          {question.long?.length > 0 && (
            <>
              <div className="sn-section-title">Long Answer</div>
              <div className="sn-q-list">
                {question.long.map((q, i) => (
                  <div key={i} className="sn-q-card">
                    <span className="sn-q-num">{i + 1}</span>
                    <p className="sn-q-text"><Bold text={q} /></p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
    EXAM VIEW
═══════════════════════════════════════════════════ */
function ExamView({ content }) {
  const { revisonPoint, question } = content || {};
  return (
    <>
      {revisonPoint?.length > 0 && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Exam Mode — Test Your Recall</span>
            <div className="sn-block-rule" />
          </div>
          {revisonPoint.map((pt, i) => <RevealCard key={i} text={pt} index={i} />)}
        </div>
      )}
      {question?.short?.length > 0 && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Practice — Short Answer</span>
            <div className="sn-block-rule" />
          </div>
          <div className="sn-q-list">
            {question.short.map((q, i) => (
              <div key={i} className="sn-q-card">
                <span className="sn-q-num">{i + 1}</span>
                <p className="sn-q-text"><Bold text={q} /></p>
              </div>
            ))}
          </div>
        </div>
      )}
      {question?.long?.length > 0 && (
        <div className="sn-block">
          <div className="sn-block-header">
            <span className="sn-block-eyebrow">Practice — Long Answer</span>
            <div className="sn-block-rule" />
          </div>
          <div className="sn-q-list">
            {question.long.map((q, i) => (
              <div key={i} className="sn-q-card">
                <span className="sn-q-num">{i + 1}</span>
                <p className="sn-q-text"><Bold text={q} /></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
    MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function Current() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const note = useSelector(state => state.notes?.note);

  const [examMode, setExamMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (id) getCurrentNote(id, dispatch);
  }, [id, dispatch]);

  const { topic, level, content, createdAt } = note || {};

  return (
    <>
      <InjectStyles />
      <div className="sn-app">
        <aside className={`sn-sidebar${sidebarOpen ? "" : " collapsed"}`}>
          <div className="sn-sidebar-brand">
            <div className="sn-brand-icon">✦</div>
            <div>
              <div className="sn-brand-text">ExamNotes AI</div>
              <div className="sn-brand-sub">Smart Notes</div>
            </div>
          </div>

          <nav className="sn-nav">
            <div className="sn-nav-section">Navigation</div>
            {[
              { icon: "📖", label: "Key Insight" },
              { icon: "⭐", label: "Topics by Priority" },
              { icon: "🔁", label: "Revision Points" },
              { icon: "🗺️", label: "Diagram" },
              { icon: "📊", label: "Data Visualization" },
              { icon: "❓", label: "Practice Questions" },
            ].map(item => (
              <div key={item.label} className="sn-nav-item">
                <span className="sn-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}

            <div className="sn-nav-section" style={{ marginTop: 10 }}>Mode</div>
            <div className={`sn-nav-item${examMode ? " exam-active" : ""}`} onClick={() => setExamMode(!examMode)}>
              <span className="sn-nav-icon">🎯</span>
              <span>Exam Mode</span>
              {examMode && <span className="sn-nav-badge">ON</span>}
            </div>
          </nav>

          {note && (
            <div className="sn-sidebar-footer">
              <div className="sn-meta-topic">{topic}</div>
              <div className="sn-meta-sub">
                {level}
                {createdAt && ` · ${new Date(createdAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}`}
              </div>
            </div>
          )}
        </aside>

        <main className="sn-main">
          <div className="sn-topbar">
            <button className="sn-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <div className="sn-topbar-title">{topic || "Loading…"}</div>
            {level && <span className="sn-pill sn-pill-gold">{level}</span>}
            {examMode && <span className="sn-pill sn-pill-crimson">Exam Mode</span>}
            <button className={`sn-mode-btn${examMode ? " on" : ""}`} onClick={() => setExamMode(!examMode)}>
              {examMode ? "🎯 Exam ON" : "📖 Study Mode"}
            </button>
          </div>

          <div className="sn-content">
            {!note ? <Loader /> : examMode ? <ExamView content={content} /> : <StudyView content={content} />}
          </div>
        </main>
      </div>
    </>
  );
}