"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

const jwtProblems = [
    "JWT payloads are only Base64 encoded, not encrypted. Anyone can decode them.",
    "If a token leaks, it can be reused from any device.",
    "No built-in mechanism to restrict tokens to specific devices.",
    "Cannot safely enforce single-device login without additional server logic.",
];

const swtSolutions = [
    "Fully encrypts token payloads using AES-256-GCM.",
    "Binds tokens to device fingerprints managed on the backend.",
    "Prevents token reuse from unauthorized devices.",
    "Supports auto-generated device IDs for added security.",
    "Manages sessions server-side, so sensitive identifiers never reach the browser.",
];

export function Comparison() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        The Problem with <span className="text-red-400">JWT</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Traditional JWTs have fundamental limitations that SWT was designed to solve.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* JWT Problems */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-red-400">JWT Limitations</h3>
                        </div>
                        <ul className="space-y-4">
                            {jwtProblems.map((problem, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1">×</span>
                                    <span className="text-zinc-400">{problem}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* SWT Solutions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-400">SWT Solutions</h3>
                        </div>
                        <ul className="space-y-4">
                            {swtSolutions.map((solution, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                                    <span className="text-zinc-400">{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Workflow Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-8">How SWT Works</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { step: "1", title: "User Login", desc: "sign() generates token + server session" },
                            { step: "2", title: "Store Session", desc: "Server stores deviceId + fingerprint internally" },
                            { step: "3", title: "Secure Cookie", desc: "Browser receives token via HttpOnly cookie" },
                            { step: "4", title: "Verify Request", desc: "verify() checks session + fingerprint" },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center h-full">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                                        {item.step}
                                    </div>
                                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                                {index < 3 && (
                                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
