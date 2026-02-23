import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import getAllNotes from "../hooks/getAllNoes";
import clearNotes from "../hooks/C"

/* ───────────── helpers ───────────── */

function topicEmoji(topic = "") {
  const t = topic.toLowerCase();
  if (t.includes("web") || t.includes("react")) return "🌐";
  if (t.includes("math")) return "📐";
  if (t.includes("science")) return "🔬";
  if (t.includes("english")) return "📖";
  if (t.includes("computer") || t.includes("code")) return "💻";
  return "📝";
}

function NoteSkeletonRow() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-5 py-4 flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-slate-700/60" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-slate-700/60 rounded w-1/3" />
        <div className="h-2.5 bg-slate-700/40 rounded w-1/5" />
      </div>
    </div>
  );
}

/* ───────────── MAIN ───────────── */

export default function History() {
  const navigate = useNavigate();
  clearNotes();
  const userData = useSelector((s) => s.user?.userData);
  const notes = useSelector((s) => s.notes?.noteData);
  const [search, setSearch] = useState("");
  getAllNotes();
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const notesLoaded = Array.isArray(notes);
  const notesEmpty = notesLoaded && notes.length === 0;

  /* SORT + FILTER */
  const filtered = useMemo(() => {
    return (notes ?? [])
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // LATEST FIRST
      .filter((n) =>
        n.topic?.toLowerCase().includes(search.toLowerCase())
      );
  }, [notes, search]);

  /* ───────────── UI ───────────── */

  return (
    <div
      className="min-h-screen text-white px-4 pt-24 pb-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.18) 0%, transparent 70%), linear-gradient(160deg, #020617 0%, #0f172a 50%, #0d1321 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white text-sm"
          >
            ← Back
          </button>

          <div className="flex gap-3 items-center">
            <div onClick={() => navigate("/dashboard")} className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
              💎 {userData?.credits ?? 0} +
            </div>
            <button
              onClick={() => navigate("/create-note")}
              className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-sm shadow-lg"
            >
              ✨ New Note
            </button>
          </div>
        </div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl shadow-2xl p-8 backdrop-blur-xl border border-indigo-500/20 bg-slate-900/70"
        >
          <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            My Notes History
          </h1>

          {/* SEARCH */}
          {notesLoaded && !notesEmpty && (
            <input
              type="text"
              placeholder="Search topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-6 p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none"
            />
          )}

          {/* LIST */}
          <div className="space-y-3">

            {loading && [1, 2, 3].map((i) => <NoteSkeletonRow key={i} />)}

            {!loading && notesEmpty && (
              <p className="text-center text-slate-400 py-10">
                No Notes Yet 🚀
              </p>
            )}

            {!loading &&
              filtered.map((note, i) => (
                <NoteRow
                  key={note._id}
                  note={note}
                  index={i}
                  expanded={expandedId === note._id}
                  onToggle={() =>
                    setExpandedId(expandedId === note._id ? null : note._id)
                  }
                  onOpen={() => navigate(`/notes/${note._id}`)}
                />
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────── NOTE ROW ───────────── */

function NoteRow({ note, index, expanded, onToggle, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/40 transition"
    >
      <div className="flex justify-between px-4 py-3 cursor-pointer">

        {/* OPEN PAGE */}
        <div className="flex items-center gap-3" onClick={onOpen}>
          <div className="w-9 h-9 rounded bg-indigo-600/20 flex items-center justify-center">
            {topicEmoji(note.topic)}
          </div>
          <div>
            <p className="font-semibold">{note.topic}</p>
            <p className="text-xs text-slate-500">{note.level}</p>
          </div>
        </div>

        {/* EXPAND */}
        <button onClick={onToggle}>▼</button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="px-4 pb-4 border-t border-slate-700"
          >
            <p className="text-sm text-slate-300">
              {note.content?.note || "No preview"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}