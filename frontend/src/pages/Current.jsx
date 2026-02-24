import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getCurrentNote from "../hooks/getCurrentNotes";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ═══════════════════════════════════════════════════
   PALETTE
═══════════════════════════════════════════════════ */
const PALETTE = [
  "#a78bfa",
  "#f5c842",
  "#5ce0a0",
  "#e05c5c",
  "#60c8f5",
  "#f5a623",
];

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */

function Bold({ text }) {
  const str = typeof text === "string" ? text : String(text ?? "");
  const parts = str.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith("$$") && part.endsWith("$$"))
          return <BlockMath key={i} math={part.slice(2, -2)} />;

        if (part.startsWith("$") && part.endsWith("$")) {
          try {
            return <InlineMath key={i} math={part.slice(1, -1)} />;
          } catch {
            return <code key={i}>{part}</code>;
          }
        }

        if (part.startsWith("**") && part.endsWith("**"))
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

/* ───────── Markdown Table → Data ───────── */

function parseMarkdownTable(src) {
  const lines = safeStr(src)
    .trim()
    .split("\n")
    .filter((l) => !l.match(/^[\s|:-]+$/));

  if (lines.length < 2) return null;

  const headers = lines[0].split("|").map((h) => h.trim()).filter(Boolean);
  const rows = lines.slice(1).map((l) =>
    l.split("|").map((c) => c.trim()).filter(Boolean)
  );

  return { headers, rows };
}

function tableToChartData(parsed) {
  if (!parsed) return null;

  const { headers, rows } = parsed;
  const series = headers.slice(1);

  const data = rows.map((row) => {
    const entry = { name: row[0] || "" };

    series.forEach((s, i) => {
      const raw = row[i + 1];
      const num = parseFloat(String(raw).replace(/[^0-9.\-]/g, ""));
      entry[s] = isNaN(num) ? raw : num;
    });

    return entry;
  });

  const isNumeric = series.every((s) =>
    data.every((d) => typeof d[s] === "number")
  );

  return isNumeric ? { series, data } : null;
}

/* ───────── Tooltip ───────── */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "1px solid #353548",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12,
      }}
    >
      <p style={{ opacity: 0.7, marginBottom: 6 }}>{label}</p>

      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   GRAPH RENDERER
═══════════════════════════════════════════════════ */

function GraphRenderer({ tableText }) {
  const parsed = parseMarkdownTable(tableText);
  const chartData = tableToChartData(parsed);
  const [type, setType] = useState("bar");

  if (!chartData) return null;

  const { data, series } = chartData;

  const COLORS = PALETTE;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <div style={{ marginBottom: 10 }}>
        {["bar", "line", "pie", "radar"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            style={{
              marginRight: 6,
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <>
          {type === "bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {series.map((s, i) => (
                <Bar key={s} dataKey={s} fill={COLORS[i % COLORS.length]} />
              ))}
            </BarChart>
          )}

          {type === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {series.map((s, i) => (
                <Line
                  key={s}
                  type="monotone"
                  dataKey={s}
                  stroke={COLORS[i % COLORS.length]}
                />
              ))}
            </LineChart>
          )}

          {type === "pie" && (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Pie
                data={data}
                dataKey={series[0]}
                nameKey="name"
                outerRadius={100}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}

          {type === "radar" && (
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {series.map((s, i) => (
                <Radar
                  key={s}
                  dataKey={s}
                  stroke={COLORS[i % COLORS.length]}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          )}
        </>
      </ResponsiveContainer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */

export default function Current() {
  const { id } = useParams();
  const { note, loading } = getCurrentNote(id);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <div>Loading note…</div>
      </div>
    );
  }

  if (!note) {
    return <div style={{ padding: 40 }}>Note not found.</div>;
  }

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ marginBottom: 20 }}>{note.title}</h1>

      {/* Insight */}
      {note.insight && (
        <div style={{ marginBottom: 20 }}>
          <Bold text={note.insight} />
        </div>
      )}

      {/* Table → Chart */}
      {note.table && (
        <GraphRenderer tableText={note.table} />
      )}

      {/* Points */}
      {note.points?.map((p, i) => (
        <div key={i} style={{ marginTop: 10 }}>
          <Bold text={p} />
        </div>
      ))}
    </div>
  );
}