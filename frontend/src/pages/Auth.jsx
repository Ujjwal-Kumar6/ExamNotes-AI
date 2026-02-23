import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
    Brain,
    PieChart,
    LineChart,
    Sparkles,
    CheckCircle2,
    Zap,
    ArrowRight,
    Shield,
    Clock,
    TrendingUp,
    Award,
    Users,
    Star,
    Menu,
    X
} from "lucide-react";
import { login, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import getCurrentUser from "../hooks/getCurrentUser";

function Hero() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const nav = useNavigate();
    const dispach = useDispatch();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(login, provider);
            const user = result.user;

            const res = await axios.post(
                `${url}/auth/a1`,
                { name: user.displayName, email: user.email },
                { withCredentials: true }
            );
            getCurrentUser(dispach);
            nav("/")
        } catch (err) {
            console.error("Auth Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Revision",
            description: "Generate personalized study notes and summaries powered by advanced AI algorithms tailored to your learning style",
            color: "from-amber-400 to-orange-500",
            iconColor: "text-amber-50"
        },
        {
            icon: PieChart,
            title: "Visual Analytics",
            description: "Track your progress with intuitive dashboards, charts, and insights that help you identify strengths and weaknesses",
            color: "from-pink-400 to-rose-500",
            iconColor: "text-pink-50"
        },
        {
            icon: LineChart,
            title: "Smart Diagrams",
            description: "Auto-generated visual diagrams that break down complex topics into digestible, easy-to-understand components",
            color: "from-emerald-400 to-teal-500",
            iconColor: "text-emerald-50"
        }
    ];

    const benefits = [
        { icon: "💎", text: "20 Free Diamonds on Sign Up" },
        { icon: "📝", text: "5 Diamonds = 1 AI Note" },
        { icon: "💳", text: "Easy Diamond Top-Up" },
        { icon: "⚡", text: "Premium AI Materials" }
    ];

    const stats = [
        { value: "10K+", label: "Active Students" },
        { value: "50K+", label: "Notes Generated" },
        { value: "98%", label: "Success Rate" },
        { value: "4.9★", label: "User Rating" }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Medical Student",
            content: "ExamNotes AI transformed my study routine. The AI-generated notes are incredibly accurate and save me hours of work!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Engineering Student",
            content: "The visual diagrams feature is a game-changer. Complex concepts become so much easier to understand.",
            rating: 5
        },
        {
            name: "Emma Williams",
            role: "Law Student",
            content: "Best investment for my studies. The diamond system is fair and the quality is unmatched.",
            rating: 5
        }
    ];

    const pricingTiers = [
        {
            icon: "🎁",
            title: "Free Start",
            amount: "20",
            subtitle: "Diamonds on signup",
            description: "Perfect to try our platform"
        },
        {
            icon: "📝",
            title: "Per Note",
            amount: "5",
            subtitle: "Diamonds per generation",
            description: "Pay only for what you use"
        },
        {
            icon: "💳",
            title: "Top-Up",
            amount: "Anytime",
            subtitle: "Buy more diamonds",
            description: "Flexible pricing options"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-100 overflow-hidden relative">

            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={!prefersReducedMotion ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.15, 0.1]
                    } : {}}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full blur-3xl"
                />
                <motion.div
                    animate={!prefersReducedMotion ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    } : {}}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-full blur-3xl"
                />
                <motion.div
                    animate={!prefersReducedMotion ? {
                        scale: [1, 1.15, 1],
                        opacity: [0.08, 0.15, 0.08]
                    } : {}}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-600 to-rose-700 rounded-full blur-3xl"
                />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* MODERN HEADER */}
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-700/50"
                        : "bg-transparent"
                        }`}
                >
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <div className="relative">
                                    <img
                                        src="/favicon.png"
                                        alt="ExamNotes AI Logo"
                                        className="w-10 h-10 md:w-12 md:h-12 relative z-10"
                                    />
                                    <motion.div
                                        animate={!prefersReducedMotion ? {
                                            scale: [1, 1.3, 1],
                                            opacity: [0.4, 0.7, 0.4]
                                        } : {}}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-md"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        ExamNotes AI
                                    </h1>
                                    <p className="text-xs text-slate-400 hidden sm:block">Smart Study Companion</p>
                                </div>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="font-medium hover:text-indigo-400 transition-colors">Features</a>
                                <a href="#pricing" className="font-medium hover:text-indigo-400 transition-colors">Pricing</a>
                                <a href="#testimonials" className="font-medium hover:text-indigo-400 transition-colors">Reviews</a>

                                {/* GOOGLE BUTTON */}
                                <motion.button
                                    onClick={handleGoogleLogin}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-3 px-5 py-2.5 rounded-xl 
                                               bg-slate-800 border border-slate-600 shadow-sm 
                                               hover:shadow-md hover:border-indigo-500
                                               transition disabled:opacity-60"
                                >
                                    <img
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        className="w-5 h-5"
                                        alt="Google"
                                    />
                                    <span className="text-sm font-semibold">
                                        Continue with Google
                                    </span>
                                </motion.button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden bg-slate-900 border-t border-slate-700"
                            >
                                <div className="px-4 py-4 space-y-3">
                                    <a href="#features" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
                                        Features
                                    </a>
                                    <a href="#pricing" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
                                        Pricing
                                    </a>
                                    <a href="#testimonials" className="block py-2 text-slate-300 hover:text-indigo-400 font-medium">
                                        Reviews
                                    </a>
                                    <div className="pt-2 border-t border-slate-700">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-indigo-900/30 rounded-lg">
                                            <Sparkles className="w-4 h-4 text-indigo-400" />
                                            <span className="text-sm font-semibold text-indigo-300">20 Free Diamonds 💎</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>

                {/* HERO SECTION */}
                <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-6xl mx-auto"
                    >
                        {/* Trust Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 rounded-full border border-emerald-700/50 shadow-sm">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-300">Trusted by 10,000+ Students</span>
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                                <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent">
                                    Transform Your Study
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Sessions with AI
                                </span>
                            </h2>
                        </motion.div>

                        {/* Subheading */}
                        <motion.p
                            variants={itemVariants}
                            className="text-center text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
                        >
                            Generate intelligent revision notes, interactive diagrams, and track your progress with AI-powered insights. Start with <strong className="text-indigo-400">20 free diamonds</strong> — each note costs just 5 diamonds.
                        </motion.p>

                        {/* Benefits Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
                        >
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -4 }}
                                    className="flex flex-col items-center gap-2 p-4 bg-slate-800/70 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-sm hover:shadow-md transition-all"
                                >
                                    <span className="text-2xl">{benefit.icon}</span>
                                    <span className="text-xs md:text-sm text-center text-slate-300 font-medium">{benefit.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col items-center gap-6"
                        >
                            <motion.button
                                onClick={handleGoogleLogin}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex items-center justify-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto max-w-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                                <>
                                    <img
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        className="w-6 h-6 md:w-7 md:h-7"
                                        alt="Google"
                                    />
                                    <span className="text-lg md:text-xl">Continue with Google</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            </motion.button>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>Start free instantly</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 max-w-4xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -4 }}
                                    className="text-center p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
                                >
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* FEATURES SECTION */}
                <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-12 md:mb-16">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/30 rounded-full border border-indigo-700/50 mb-6"
                            >
                                <Zap className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-semibold text-indigo-300">Powerful Features</span>
                            </motion.div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-100">
                                Everything You Need to{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Excel
                                </span>
                            </h3>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                                Advanced AI-powered tools designed to make studying efficient, effective, and enjoyable
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                        className="group relative bg-slate-800 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 hover:border-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        {/* Gradient Background on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 5, scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-xl shadow-md mb-6`}
                                        >
                                            <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                                        </motion.div>

                                        {/* Content */}
                                        <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-100">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Arrow Icon */}
                                        <div className="mt-4 flex items-center text-indigo-400 font-semibold group-hover:gap-2 transition-all">
                                            <span className="text-sm">Learn more</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Additional Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
                        >
                            {[
                                { icon: Clock, text: "Save 10+ hours per week on note-taking" },
                                { icon: TrendingUp, text: "Improve retention rates by up to 40%" },
                                { icon: Award, text: "Personalized to your learning style" },
                                { icon: Users, text: "Join thousands of successful students" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-800/70 rounded-xl border border-slate-700/50">
                                    <div className="flex-shrink-0 p-2 bg-indigo-900/30 rounded-lg">
                                        <item.icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-slate-300 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* PRICING SECTION */}
                <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full border border-purple-700/50 mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-semibold text-purple-300">Simple Pricing</span>
                            </motion.div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Pay Only for{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    What You Use
                                </span>
                            </h3>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                                No subscriptions, no hidden fees — transparent diamond-based pricing
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl mb-8">
                            <div className="bg-slate-800 rounded-3xl p-8 md:p-12">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {pricingTiers.map((tier, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="text-center p-6 bg-gradient-to-br from-slate-900 to-indigo-900/30 rounded-2xl border border-slate-700 hover:border-indigo-600 transition-all"
                                        >
                                            <div className="text-5xl mb-4">{tier.icon}</div>
                                            <h4 className="text-xl font-bold text-slate-100 mb-2">{tier.title}</h4>
                                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                                {tier.amount}
                                            </div>
                                            <p className="text-slate-300 font-medium mb-3">{tier.subtitle}</p>
                                            <p className="text-sm text-slate-400">{tier.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center p-6 bg-emerald-900/30 rounded-2xl border border-emerald-700">
                                    <p className="text-lg text-slate-200">
                                        ✨ Your first <strong className="text-emerald-400">4 notes are completely FREE</strong> with your welcome diamonds!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Value Proposition */}
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-slate-800/70 rounded-xl border border-slate-700/50">
                                <div className="text-2xl mb-2">⚡</div>
                                <h5 className="font-bold text-slate-100 mb-1">Instant Access</h5>
                                <p className="text-sm text-slate-400">Generate notes in seconds</p>
                            </div>
                            <div className="p-6 bg-slate-800/70 rounded-xl border border-slate-700/50">
                                <div className="text-2xl mb-2">🎯</div>
                                <h5 className="font-bold text-slate-100 mb-1">High Quality</h5>
                                <p className="text-sm text-slate-400">Premium AI-generated content</p>
                            </div>
                            <div className="p-6 bg-slate-800/70 rounded-xl border border-slate-700/50">
                                <div className="text-2xl mb-2">💰</div>
                                <h5 className="font-bold text-slate-100 mb-1">Fair Pricing</h5>
                                <p className="text-sm text-slate-400">Pay per use, no commitments</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* TESTIMONIALS SECTION */}
                <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/30 rounded-full border border-amber-700/50 mb-6"
                            >
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm font-semibold text-amber-300">Student Reviews</span>
                            </motion.div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                Loved by Students{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Worldwide
                                </span>
                            </h3>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
                                See what students are saying about their experience with ExamNotes AI
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 mb-6 leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-100">{testimonial.name}</div>
                                            <div className="text-sm text-slate-400">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 md:p-16 shadow-2xl"
                    >
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Study Game?
                        </h3>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of students who are already achieving better grades with AI-powered notes
                        </p>
                        <motion.button
                            onClick={handleGoogleLogin}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-indigo-600 font-bold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-xl flex items-center gap-3 mx-auto disabled:opacity-50"
                        >

                            <>
                                <span>Get Started Free</span>
                                <ArrowRight className="w-6 h-6" />
                            </>
                        </motion.button>
                        <p className="mt-6 text-indigo-100">
                            🎁 <strong>20 free diamonds</strong> waiting for you • No credit card required
                        </p>
                    </motion.div>
                </section>

                {/* FOOTER */}
                <footer className="mt-8 py-12 md:py-16 bg-gradient-to-b from-transparent to-slate-900/80 backdrop-blur-xl border-t border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Main Footer Content */}
                        <div className="grid md:grid-cols-4 gap-8 mb-12">
                            {/* Brand Column */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src="/favicon.png" alt="ExamNotes AI" className="w-10 h-10" />
                                    <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                        ExamNotes AI
                                    </h4>
                                </div>
                                <p className="text-slate-400 mb-4 max-w-md">
                                    Empowering students worldwide with AI-powered study materials, smart diagrams, and personalized learning insights.
                                </p>
                                <div className="flex gap-4">
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        href="https://github.com/Ujjwal-Kumar6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-slate-700 hover:bg-indigo-500 text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h5 className="font-bold text-slate-100 mb-4">Quick Links</h5>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="text-slate-400 hover:text-indigo-400 transition-colors">Features</a></li>
                                    <li><a href="#pricing" className="text-slate-400 hover:text-indigo-400 transition-colors">Pricing</a></li>
                                    <li><a href="#testimonials" className="text-slate-400 hover:text-indigo-400 transition-colors">Reviews</a></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h5 className="font-bold text-slate-100 mb-4">Get in Touch</h5>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="mailto:uk7320942276@gmail.com"
                                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                                        >
                                            uk7320942276@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vybe-ev36.onrender.com/profile/Ujjwal__Kumar"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                                        >
                                            Vybe Social Profile
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-8 border-t border-slate-700">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-slate-400 text-sm text-center md:text-left">
                                    © 2026 ExamNotes AI — Crafted with{" "}
                                    <motion.span
                                        animate={!prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 1, repeat: Infinity }}
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
                                    <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                                    <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Hero;