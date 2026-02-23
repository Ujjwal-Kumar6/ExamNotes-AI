import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Plus, FileText, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../App';
import { setUserData } from '../redux/userSlice';

function Nav() {
    const [isScrolled, setIsScrolled] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user?.userData || null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post(`${url}/auth/a2`,{},{withCredentials: true});
            dispatch(setUserData(null));
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-700/50'
                    : 'bg-transparent'
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <img src="/favicon.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12" />
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ExamNotes AI
                        </h1>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        {userData && (
                            <>
                                {/* My Notes */}
                                <motion.button
                                    onClick={() => navigate('/my-notes')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                               bg-slate-800 border border-slate-600
                                               text-slate-300 hover:text-white"
                                >
                                    <FileText className="w-4 h-4" />
                                    My Notes
                                </motion.button>

                                {/* Create Note */}
                                <motion.button
                                    onClick={() => navigate('/create-note')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                               bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Note
                                </motion.button>

                                {/* Credits */}
                                <motion.button
                                    onClick={() => navigate('/dashboard')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                               bg-slate-800 border border-amber-500/50
                                               hover:border-amber-500 transition-all group"
                                >
                                    <span className="text-sm font-semibold text-amber-400">
                                        💎 {userData.credits?.toLocaleString() || 0}
                                    </span>
                                    <Plus className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                </motion.button>

                                {/* Logout */}
                                <motion.button
                                    onClick={handleLogOut}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                                               bg-red-600/20 border border-red-500
                                               text-red-400 hover:bg-red-600/30 font-semibold"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    {userData && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-300"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && userData && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-t border-slate-700"
                    >
                        <div className="px-4 py-4 space-y-3">

                            {/* Credits */}
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/dashboard');
                                }}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                           bg-slate-800 border border-amber-500/50 rounded-lg"
                            >
                                💎 {userData.credits?.toLocaleString() || 0}
                                <Plus className="w-5 h-5 text-amber-400" />
                            </button>

                            {/* Create Note */}
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/create-note');
                                }}
                                className="w-full bg-indigo-600 py-3 rounded-lg text-white flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Create Note
                            </button>

                            {/* My Notes */}
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/my-notes');
                                }}
                                className="w-full bg-slate-800 py-3 rounded-lg text-slate-300 flex items-center justify-center gap-2"
                            >
                                <FileText className="w-5 h-5" />
                                My Notes
                            </button>

                            {/* Logout */}
                            <button
                                onClick={handleLogOut}
                                className="w-full bg-red-600/20 border border-red-500
                                           py-3 rounded-lg text-red-400 font-semibold flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Nav;