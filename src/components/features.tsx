"use client";

import { motion } from "framer-motion";
import { Shield, Fingerprint, Server, Ban, Database, Lock } from "lucide-react";

const features = [
    {
        title: "AES-256-GCM Encryption",
        description: "Payloads are fully encrypted, not just Base64 encoded like JWT. Nobody can decode your token without the secret.",
        icon: Lock,
    },
    {
        title: "Device Fingerprint Binding",
        description: "Tokens are locked to specific devices or sessions, preventing unauthorized reuse from different machines.",
        icon: Fingerprint,
    },
    {
        title: "Server-Side Sessions",
        description: "Device IDs and sessions are managed securely on the backend—never exposed to the browser.",
        icon: Server,
    },
    {
        title: "Prevent Token Theft",
        description: "Even if a token leaks, it cannot be reused from unauthorized devices. Complete protection against replay attacks.",
        icon: Ban,
    },
    {
        title: "Auto Device Registration",
        description: "Automatically generate and manage device IDs for seamless security without manual configuration.",
        icon: Database,
    },
    {
        title: "Single-Device Enforcement",
        description: "Built-in support for restricting access to a single device without complex additional server logic.",
        icon: Shield,
    },
];

const useCases = [
    "Course platforms with anti-piracy requirements",
    "SaaS dashboards with sensitive data",
    "Admin panels with restricted access",
    "Any system requiring device-bound authentication",
];

export function Features() {
    return (
        <section id="about" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Why <span className="text-blue-500">SWT</span> Over JWT?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Traditional JSON Web Tokens (JWT) are only Base64 encoded—making them easy to decode and vulnerable to theft.
                        <strong>Secure Web Token (SWT)</strong> encrypts every payload with <strong>AES-256-GCM</strong> and strictly binds tokens to verified devices.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.5)" }}
                            className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Use Cases */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Perfect For</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {useCases.map((useCase) => (
                            <span
                                key={useCase}
                                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300"
                            >
                                {useCase}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
