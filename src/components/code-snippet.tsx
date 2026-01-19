"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CodeSnippet() {
    const [copied, setCopied] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"sign" | "verify">("sign");

    const signCode = `import { sign } from "secure-web-token";

const secret = "my-super-secret";

// Auto device registration + server session
const { token, sessionId } = sign(
  { userId: 1, role: "admin" },
  secret,
  { fingerprint: true, store: "memory", expiresIn: 3600 }
);

console.log("TOKEN:", token);
console.log("SESSION ID (internal):", sessionId);`;

    const verifyCode = `import { verify, getStore } from "secure-web-token";

// Get the store instance
const store = getStore("memory");

try {
  const payload = verify(token, secret, {
    sessionId,          // Server-side session ID
    fingerprint: "abc", // Device fingerprint
    store: "memory"     // Must match the store
  });

  console.log("USER DATA:", payload.data);
} catch (err) {
  console.error("AUTH ERROR:", err.message);
}`;

    const installCode = `npm install secure-web-token`;

    const importCode = `// ESM
import { sign, verify, getStore } from "secure-web-token";

// CommonJS
const { sign, verify, getStore } = require("secure-web-token");`;

    const payloadCode = `{
  "data": {
    "userId": 1,
    "role": "admin"
  },
  "iat": 1768368114,
  "exp": 1768369014,
  "fp": "device-fingerprint"
}`;

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const highlightCode = (code: string) => {
        const lines = code.split('\n');

        return lines.map((line, lineIndex) => {
            const tokens: React.ReactNode[] = [];
            let remaining = line;
            let keyIndex = 0;

            const patterns = [
                { regex: /\/\/.*$/, className: "text-zinc-500 italic" },
                { regex: /"[^"]*"/, className: "text-emerald-400" },
                { regex: /'[^']*'/, className: "text-emerald-400" },
                { regex: /\b(import|export|from|const|let|var|function|return|try|catch|throw|new|await|async|if|else|require)\b/, className: "text-purple-400" },
                { regex: /\b(true|false|null|undefined)\b/, className: "text-orange-400" },
                { regex: /\b\d+\b/, className: "text-orange-400" },
                { regex: /\b(sign|verify|getStore|log|error)\b(?=\s*\()/, className: "text-cyan-400" },
                { regex: /\b(console)\b/, className: "text-blue-400" },
                { regex: /([a-zA-Z_]\w*)(?=\s*:)/, className: "text-sky-300" },
            ];

            while (remaining.length > 0) {
                let bestMatch: { index: number; length: number; element: React.ReactNode } | null = null;

                for (const pattern of patterns) {
                    const match = remaining.match(pattern.regex);
                    if (match && match.index !== undefined) {
                        const matchIndex = match.index;
                        const matchLength = match[0].length;

                        if (!bestMatch || matchIndex < bestMatch.index) {
                            bestMatch = {
                                index: matchIndex,
                                length: matchLength,
                                element: <span key={keyIndex++} className={pattern.className}>{match[0]}</span>
                            };
                        }
                    }
                }

                if (bestMatch && bestMatch.index === 0) {
                    tokens.push(bestMatch.element);
                    remaining = remaining.slice(bestMatch.length);
                } else if (bestMatch) {
                    tokens.push(<span key={keyIndex++} className="text-zinc-300">{remaining.slice(0, bestMatch.index)}</span>);
                    tokens.push(bestMatch.element);
                    remaining = remaining.slice(bestMatch.index + bestMatch.length);
                } else {
                    tokens.push(<span key={keyIndex++} className="text-zinc-300">{remaining}</span>);
                    remaining = "";
                }
            }

            return (
                <div key={lineIndex} className="table-row group/line">
                    <span className="table-cell pr-4 text-right text-zinc-600 select-none w-8 group-hover/line:text-zinc-500 transition-colors">
                        {lineIndex + 1}
                    </span>
                    <span className="table-cell">
                        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
                    </span>
                </div>
            );
        });
    };

    const CodeBlock = ({ code, filename, id }: { code: string; filename: string; id: string }) => (
        <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-linear-to-b from-zinc-900/80 to-[#0a0a0a] shadow-2xl hover:border-zinc-700 transition-all duration-300">
            <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/60 border-b border-zinc-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-lg shadow-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-lg shadow-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-lg shadow-green-500/20" />
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                        <Terminal className="w-3.5 h-3.5" />
                        {filename}
                    </div>
                </div>
                <button
                    onClick={() => handleCopy(code, id)}
                    className="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all text-zinc-500 hover:text-white flex items-center gap-2 text-xs font-medium"
                >
                    <AnimatePresence mode="wait">
                        {copied === id ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1.5 text-emerald-400"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Copied!
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1.5"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                Copy
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
            <div className="p-5 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                    <code className="table w-full">
                        {highlightCode(code)}
                    </code>
                </pre>
            </div>
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );

    return (
        <section id="docs" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Quick <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Start</span>
                            </h2>
                            <p className="text-zinc-400 text-lg">Get up and running with SWT in seconds</p>
                        </motion.div>
                    </div>

                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25">1</span>
                                <h3 className="text-lg font-semibold text-white">Install Package</h3>
                            </div>
                            <CodeBlock code={installCode} filename="terminal" id="install" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-500/25">2</span>
                                <h3 className="text-lg font-semibold text-white">Import SWT</h3>
                            </div>
                            <CodeBlock code={importCode} filename="app.js" id="import" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/25">3</span>
                                <h3 className="text-lg font-semibold text-white">Core Functions</h3>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setActiveTab("sign")}
                                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "sign"
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        }`}
                                >
                                    sign()
                                </button>
                                <button
                                    onClick={() => setActiveTab("verify")}
                                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "verify"
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        }`}
                                >
                                    verify()
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CodeBlock
                                        code={activeTab === "sign" ? signCode : verifyCode}
                                        filename={activeTab === "sign" ? "auth.ts" : "middleware.ts"}
                                        id={activeTab}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-500/25">4</span>
                                <h3 className="text-lg font-semibold text-white">Payload Structure</h3>
                            </div>
                            <CodeBlock code={payloadCode} filename="payload.json" id="payload" />
                            <p className="mt-4 text-sm text-zinc-500 pl-1">
                                Note: The <code className="text-cyan-400 font-mono">fp</code> (fingerprint) and session ID are stored server-side only.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 font-mono"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                            100% Type Safe
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                            ESM + CommonJS
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                            MIT Licensed
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
