"use client";

import { useState, useEffect } from "react";
import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="bg-black border-t border-zinc-800 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b6c4f181-7ace-4ae6-bdd4-527a88192d21/logo1-1768672727420.png?width=8000&height=8000&resize=contain"
                                alt="SWT Secure Web Token"
                                className="h-10 w-auto brightness-110 contrast-110"
                            />
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Securing the next generation of web applications with quantum-resistant tokens.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><Link href="#home" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-blue-400 transition-colors">About</Link></li>
                            <li><Link href="#docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Status</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-600 text-xs">
                        © {mounted ? new Date().getFullYear() : "2026"} Secure Web Token. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
