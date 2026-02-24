import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../App";

function Hero() {
  const userData = useSelector((state) => state.user?.userData || null);
  const navigate = useNavigate();

  const handleBuy = async (amount) => {
    try {
      const res = await axios.post(`${url}/topup/topup`, {
        amount,
      }, { withCredentials: true });
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="text-white px-6 pt-24 pb-24">

      {/* ================= HERO TOP ================= */}
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
            bg-clip-text text-transparent">
            Hello {userData?.name || "Student"} 👋
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-8">
            Generate smart AI notes, diagrams and revisions in seconds.
            Study faster. Score higher.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-note")}
              className="px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-500 to-purple-600
              shadow-lg hover:shadow-indigo-500/30"
            >
              ✨ Create Notes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/my-notes")}
              className="px-8 py-3 rounded-xl font-semibold
              border border-slate-600 text-slate-300
              hover:bg-slate-800"
            >
              📄 View Notes
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="max-w-6xl mx-auto mt-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12
          bg-gradient-to-r from-indigo-400 to-purple-400
          bg-clip-text text-transparent">
          Powerful Features 🚀
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "AI Smart Notes", desc: "Instant exam-ready notes." },
            { title: "Auto Diagrams", desc: "Clear visual explanations." },
            { title: "Revision Mode", desc: "One-click quick summaries." }
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-700
              rounded-2xl p-8 text-center shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= PRICING ================= */}
      <div className="max-w-6xl mx-auto mt-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4
          bg-gradient-to-r from-purple-400 to-pink-400
          bg-clip-text text-transparent">
          Top-Up Diamonds 💎
        </h2>

        <p className="text-center text-slate-500 mb-12 text-sm">
          *Maximum diamond balance:
          <span className="text-indigo-400 font-semibold">
            {" "}2,14,74,83,647
          </span> (INT-32 limit)
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Basic",   dia: 100,  price: "₹50",  amount: 50,  popular: false },
            { name: "Pro",     dia: 300,  price: "₹99",  amount: 99,  popular: true  },
            { name: "Premium", dia: 1000, price: "₹249", amount: 249, popular: false },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl 
              p-8 text-center shadow-lg
              ${p.popular ? "border-purple-600 scale-105" : "border-slate-700"}`}
            >
              {p.popular && (
                <span className="text-xs bg-purple-600 px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-xl font-semibold mt-3">{p.name}</h3>
              <p className="text-3xl font-bold my-3">💎 {p.dia.toLocaleString()}</p>
              <p className="text-indigo-400 font-bold text-xl">{p.price}</p>

              <button
                onClick={() => handleBuy(p.amount)}
                className="mt-6 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700"
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 mt-10">
          Diamonds cannot exceed INT-32 storage limit.
        </p>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="max-w-6xl mx-auto mt-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12
          bg-gradient-to-r from-pink-400 to-indigo-400
          bg-clip-text text-transparent">
          Student Reviews ⭐
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rahul", text: "Saved my exam time!" },
            { name: "Ananya", text: "Diagrams are super clear." },
            { name: "Vikram", text: "Best AI notes tool." }
          ].map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-700
              rounded-2xl p-8 shadow-lg"
            >
              <p className="text-slate-300 mb-4">"{r.text}"</p>
              <h4 className="font-semibold text-indigo-400">— {r.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Hero;