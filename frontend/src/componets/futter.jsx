import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 py-12 md:py-16 bg-gradient-to-b from-transparent to-slate-900/80 backdrop-blur-xl border-t border-slate-700 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/favicon.png"
                alt="ExamNotes AI Logo"
                className="w-10 h-10 rounded-lg"
              />
              <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ExamNotes AI
              </h4>
            </div>

            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Empowering students with AI-powered notes, diagrams and smart
              revision tools to study faster and score higher.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Ujjwal-Kumar6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-full flex items-center justify-center transition shadow-lg hover:shadow-indigo-500/30"
              >
                {/* GitHub Icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.25 9.28 7.76 10.78.57.1.78-.25.78-.55v-2.02c-3.15.69-3.82-1.34-3.82-1.34-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.73.8 1.17 1.81 1.17 3.05 0 4.35-2.66 5.31-5.19 5.59.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="font-bold text-slate-100 mb-4">Quick Links</h5>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#features" className="hover:text-indigo-400 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition">Pricing</a></li>
              <li><a href="#reviews" className="hover:text-indigo-400 transition">Reviews</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h5 className="font-bold text-slate-100 mb-4">Contact</h5>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a
                  href="mailto:uk7320942276@gmail.com"
                  className="hover:text-indigo-400 transition"
                >
                  uk7320942276@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://vybe-ev36.onrender.com/profile/Ujjwal__Kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition"
                >
                  Social Profile
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-400 text-sm text-center md:text-left">
              © {year} ExamNotes AI — Made with{" "}
              <motion.span
                animate={!prefersReducedMotion ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span>{" "}
              by{" "}
              <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Ujjwal Kumar
              </span>
            </p>

            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition">Terms of Service</a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;