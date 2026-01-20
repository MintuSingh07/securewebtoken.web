"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, ShieldCheck, Fingerprint, Lock, Copy, Check, Shield, Key, KeyRound, Binary, Database, Server, Cpu, Wifi, Cloud, Zap, Hash, Code, Terminal } from "lucide-react";

// Floating icon component - optimized
function FloatingIcon({ icon: Icon, className, delay = 0, duration = 4 }: { icon: React.ElementType; className: string; delay?: number; duration?: number }) {
    return (
        <motion.div
            className={`absolute ${className}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1, 0.8],
                y: [0, -15, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        >
            <Icon className="w-4 h-4 text-blue-500/40" />
        </motion.div>
    );
}

// Particle component
function Particle({ index }: { index: number }) {
    const [mounted, setMounted] = useState(false);
    const [randomValues, setRandomValues] = useState<{
        x: number;
        delay: number;
        duration: number;
        size: number;
    } | null>(null);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        setMounted(true);
        setInnerHeight(window.innerHeight);
        setRandomValues({
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 15 + Math.random() * 10,
            size: 1 + Math.random() * 2,
        });
    }, []);

    if (!mounted || !randomValues) return null;

    return (
        <motion.div
            className="absolute rounded-full bg-blue-500/30"
            style={{
                width: randomValues.size,
                height: randomValues.size,
                left: `${randomValues.x}%`,
                bottom: '-5%',
            }}
            animate={{
                y: [0, -innerHeight * 1.2],
                opacity: [0, 0.8, 0],
                x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
                duration: randomValues.duration,
                repeat: Infinity,
                delay: randomValues.delay,
                ease: "linear",
            }}
        />
    );
}

// Binary rain column
function BinaryColumn({ index }: { index: number }) {
    const [mounted, setMounted] = useState(false);
    const [randomValues, setRandomValues] = useState<{
        text: string;
        x: number;
        delay: number;
        duration: number;
    } | null>(null);

    useEffect(() => {
        setMounted(true);
        const chars = "01";
        const text = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join("\n");
        const x = (index * 5) + Math.random() * 3;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 6;
        setRandomValues({ text, x, delay, duration });
    }, [index]);

    if (!mounted || !randomValues) return null;

    return (
        <motion.div
            className="absolute text-[8px] font-mono text-blue-500/20 whitespace-pre leading-tight pointer-events-none"
            style={{ left: `${randomValues.x}%`, top: '-20%' }}
            animate={{
                y: ['0%', '120vh'],
                opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
                duration: randomValues.duration,
                repeat: Infinity,
                delay: randomValues.delay,
                ease: "linear",
            }}
        >
            {randomValues.text}
        </motion.div>
    );
}

// Cursor light component
function CursorLight() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed pointer-events-none z-0"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <div className="w-[400px] h-[400px] rounded-full bg-gradient-radial from-blue-500/10 via-blue-500/3 to-transparent blur-2xl" />
        </motion.div>
    );
}

// Hexagon grid pattern
function HexGrid() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <polygon
                        points="25,0 50,14.4 50,43.4 25,57.8 0,43.4 0,14.4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-blue-400"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
    );
}

export function Hero() {
    const [copied, setCopied] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [cursorX, cursorY]);

    const handleCopy = () => {
        navigator.clipboard.writeText("npm install secure-web-token");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const floatingIcons = [
        { icon: Binary, className: "top-[15%] left-[8%]", delay: 0 },
        { icon: Database, className: "top-[25%] right-[12%]", delay: 0.5 },
        { icon: Server, className: "bottom-[30%] left-[5%]", delay: 1 },
        { icon: Cloud, className: "bottom-[20%] right-[15%]", delay: 1.5 },
        { icon: Hash, className: "bottom-[40%] left-[12%]", delay: 2 },
    ];

    return (
        <section ref={sectionRef} id="home" className="relative min-h-screen lg:min-h-screen flex items-center pt-20 pb-16 lg:pb-0 overflow-hidden bg-black">
            {/* Cursor following light */}
            <CursorLight />

            {/* Hexagon grid background */}
            <HexGrid />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[80px] rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[80px] rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-cyan-500/5 blur-[60px] rounded-full"
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 50, 0],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            {/* Binary rain effect - reduced for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                    <BinaryColumn key={i} index={i} />
                ))}
            </div>

            {/* Floating particles - reduced for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Particle key={i} index={i} />
                ))}
            </div>

            {/* Floating icons - reduced for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIcons.map((item, i) => (
                    <FloatingIcon key={i} icon={item.icon} className={item.className} delay={item.delay} />
                ))}
            </div>

            {/* Animated grid lines - reduced for performance */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                    animate={{ opacity: [0, 0.5, 0], scaleY: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                    className="absolute top-0 left-[70%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                    animate={{ opacity: [0, 0.5, 0], scaleY: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Lock className="w-3 h-3" />
                            AES-256-GCM Encrypted
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Beyond JWT.
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-[length:200%_auto]"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    backgroundPosition: ['0%', '100%', '0%'],
                                }}
                                transition={{
                                    opacity: { duration: 0.6, delay: 0.5 },
                                    x: { duration: 0.6, delay: 0.5 },
                                    backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
                                }}
                            >
                                Secure Web Token
                            </motion.span>
                        </h1>

                        <motion.p
                            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            Device-bound, server-side session tokens with AES-256-GCM encryption.
                            Unlike JWT, SWT payloads are fully encrypted—not just Base64 encoded. Prevent token theft and unauthorized reuse.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <motion.a
                                href="#docs"
                                className="relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] flex items-center gap-2 group overflow-hidden"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="#docs"
                                className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-blue-500 hover:bg-zinc-800 text-white rounded-full font-bold transition-all relative overflow-hidden group hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                View Documentation
                            </motion.a>
                        </motion.div>

                        <motion.div
                            className="mt-8 px-3 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg inline-flex items-center gap-3 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            whileHover={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                        >
                            <code className="text-sm font-mono text-zinc-400">
                                <span className="text-zinc-500">$</span> npm install <span className="text-blue-400">secure-web-token</span>
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-zinc-800 rounded-lg transition-all text-zinc-500 hover:text-white"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            exit={{ scale: 0.8, opacity: 0, rotate: 180 }}
                                        >
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex items-center justify-center lg:justify-start gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                        >
                            {[
                                { icon: ShieldCheck, text: "AES-256-GCM", delay: 0 },
                                { icon: Fingerprint, text: "Device Bound", delay: 0.1 },
                                { icon: Lock, text: "Server-Side Sessions", delay: 0.2 },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-2 cursor-default"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.3 + item.delay }}
                                >
                                    <item.icon className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm font-medium text-zinc-400">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="flex-1 relative hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-[400px] lg:max-w-[600px] mx-auto">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full" />

                        {/* Security Shield Visual */}
                        <div className="relative z-10 flex items-center justify-center min-h-[350px] lg:min-h-[500px]">
                            {/* Outer Ring */}
                            <motion.div
                                className="absolute w-[300px] md:w-[350px] lg:w-[480px] h-[300px] md:h-[350px] lg:h-[480px] rounded-full border border-blue-500/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                <motion.div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                {/* Additional orbit dots */}
                                <motion.div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                />
                            </motion.div>

                            {/* Data orbit ring */}
                            <motion.div
                                className="absolute w-[260px] md:w-[310px] lg:w-[430px] h-[260px] md:h-[310px] lg:h-[430px] rounded-full border border-dashed border-blue-500/10"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `rotate(${deg}deg) translateX(${130}px) translateY(-50%)`,
                                        }}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    />
                                ))}
                            </motion.div>

                            {/* Middle Ring */}
                            <motion.div
                                className="absolute w-[240px] md:w-[280px] lg:w-[380px] h-[240px] md:h-[280px] lg:h-[380px] rounded-full border border-cyan-500/30"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            >
                                <motion.div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                                    animate={{ boxShadow: ['0 0 10px rgba(34, 211, 238, 0.5)', '0 0 20px rgba(34, 211, 238, 0.8)', '0 0 10px rgba(34, 211, 238, 0.5)'] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                                    animate={{ boxShadow: ['0 0 10px rgba(34, 211, 238, 0.5)', '0 0 20px rgba(34, 211, 238, 0.8)', '0 0 10px rgba(34, 211, 238, 0.5)'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                                />
                            </motion.div>

                            {/* Inner Ring */}
                            <motion.div
                                className="absolute w-[180px] md:w-[200px] lg:w-[280px] h-[180px] md:h-[200px] lg:h-[280px] rounded-full border border-emerald-500/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <motion.div
                                    className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>

                            {/* Pulse rings */}
                            <motion.div
                                className="absolute w-[200px] md:w-[240px] lg:w-[340px] h-[200px] md:h-[240px] lg:h-[340px] rounded-full border border-blue-500/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute w-[200px] md:w-[240px] lg:w-[340px] h-[200px] md:h-[240px] lg:h-[340px] rounded-full border border-cyan-500/20"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />

                            {/* Central Shield */}
                            <motion.div
                                className="relative w-[140px] md:w-[160px] lg:w-[220px] h-[140px] md:h-[160px] lg:h-[220px] flex items-center justify-center"
                                style={{
                                    x: useTransform(cursorX, [0, 2000], [10, -10]),
                                    y: useTransform(cursorY, [0, 2000], [10, -10]),
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-lg" />
                                <div className="relative bg-zinc-900/80 border border-zinc-700 rounded-full w-full h-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                                    {/* Inner glow effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <Shield className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 text-blue-400" strokeWidth={1.5} />
                                        </motion.div>
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <KeyRound className="w-7 md:w-8 lg:w-10 h-7 md:h-8 lg:h-10 text-cyan-300" strokeWidth={2} />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Floating Security Elements */}
                            <motion.div
                                className="absolute -top-4 lg:-top-8 right-2 lg:right-4 px-3 lg:px-4 py-2 lg:py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg shadow-xl backdrop-blur-sm"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-mono text-zinc-400">AES-256</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 lg:-bottom-6 left-2 lg:left-4 px-3 lg:px-4 py-2 lg:py-2.5 bg-zinc-900/90 border border-blue-500/30 rounded-lg shadow-xl backdrop-blur-sm"
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Lock className="w-3 h-3 text-blue-400" />
                                    <span className="text-xs font-mono text-zinc-400">encrypted</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute top-1/3 -left-6 lg:-left-12 px-3 lg:px-4 py-2 lg:py-2.5 bg-zinc-900/90 border border-purple-500/30 rounded-lg shadow-xl backdrop-blur-sm hidden lg:flex"
                                animate={{ x: [0, -6, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Fingerprint className="w-3 h-3 text-purple-400" />
                                    <span className="text-xs font-mono text-zinc-400">device-bound</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-1/3 -right-6 lg:-right-12 px-3 lg:px-4 py-2 lg:py-2.5 bg-zinc-900/90 border border-cyan-500/30 rounded-lg shadow-xl backdrop-blur-sm hidden lg:flex"
                                animate={{ x: [0, 6, 0] }}
                                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Key className="w-3 h-3 text-cyan-400" />
                                    <span className="text-xs font-mono text-zinc-400">session</span>
                                </div>
                            </motion.div>

                            {/* Additional floating elements */}
                            <motion.div
                                className="absolute top-[15%] left-[15%] w-1 h-1 bg-blue-400 rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                                className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-[20%] left-[25%] w-1 h-1 bg-emerald-400 rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                            <motion.div
                                className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
