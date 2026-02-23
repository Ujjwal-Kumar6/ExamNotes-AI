import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../App";
import { updateCradint } from "../redux/userSlice";

function Notes() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [examType, setExamType] = useState("");
  const nav = useNavigate();
  const [revision, setRevision] = useState(false);
  const [diagram, setDiagram] = useState(false);
  const [charts, setCharts] = useState(false);
  const dispach = useDispatch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ ADD PROGRESS STATE
  const [statusMessage, setStatusMessage] = useState(""); // ✅ ADD STATUS MESSAGE

  const handleGenerate = async () => {
    if (!topic || !level || !examType) {
      alert("You must fill all the information");
      return;
    }

    setLoading(true);
    setProgress(0);
    setStatusMessage("Initializing...");

    try {
      // ✅ Simulate progress (if backend doesn't support streaming)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Stop at 90%, wait for actual response
          return prev + 10;
        });
      }, 500);

      setStatusMessage("Generating notes...");

      const res = await axios.post(
        `${url}/ai/c1`,
        {
          topic,
          level,
          examType,
          revision,
          diagram,
          charts,
        },
        { withCredentials: true }
      );

      clearInterval(progressInterval); // ✅ Clear interval
      setProgress(100);
      setStatusMessage("Complete!");

      console.log(res.data);

      if(res.data.creaditsLeft !== undefined) {
        dispach(updateCradint(res.data.creaditsLeft));
      }

      // ✅ Small delay before navigation so user sees 100%
      navigate("/my-notes")


    } catch (error) {
      console.error(error);
      setStatusMessage("Error occurred!");
      alert("Failed to generate notes. Please try again.");
    } finally {
      setLoading(false); // ✅ FIXED TYPO (was 'flase')
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-4 pt-24 pb-16">

      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">

        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white transition"
        >
          ← Back
        </button>

        <div className="flex gap-3 items-center">

          {/* CREDITS */}
          <div onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm shadow">
            💎 {userData?.credits ?? 0} +
          </div>

          {/* YOUR NOTES */}
          <button
            onClick={() => navigate("/my-notes")}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm shadow"
          >
            📄 Your Notes ({userData?.notes?.length || 0})
          </button>

        </div>
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-xl 
                   border border-slate-700 rounded-2xl shadow-2xl p-8"
      >
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ExamNotes AI
        </h1>

        <p className="text-slate-400 mb-8 text-sm">
          Hello {userData?.name || "Student"} 👋
        </p>

        {/* INPUTS */}
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Enter Topic (e.g. Web Development)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 
                       focus:outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            placeholder="Class / Level (e.g. Class 10)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 
                       focus:outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 
                       focus:outline-none focus:border-indigo-500"
          />

        </div>

        {/* TOGGLES */}
        <div className="flex flex-wrap gap-6 mt-8 text-sm">
          <Toggle label="Exam Revision Mode" state={revision} setState={setRevision} />
          <Toggle label="Include Diagram" state={diagram} setState={setDiagram} />
          <Toggle label="Include Charts" state={charts} setState={setCharts} />
        </div>

        {/* ✅ IMPROVED PROGRESS BAR */}
        {loading && (
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>{statusMessage}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-xl h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-10 py-4 rounded-xl font-semibold 
                     bg-gradient-to-r from-indigo-500 to-purple-600 
                     hover:opacity-90 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "✨ Generate Notes"}
        </button>

      </motion.div>
    </div>
  );
}

/* TOGGLE */
function Toggle({ label, state, setState }) {
  return (
    <div
      onClick={() => setState(!state)}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <div
        className={`w-11 h-6 rounded-full p-1 transition 
        ${state ? "bg-indigo-600" : "bg-slate-700"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition 
          ${state ? "translate-x-5" : ""}`}
        />
      </div>
      <span className="text-slate-300">{label}</span>
    </div>
  );
}

export default Notes;