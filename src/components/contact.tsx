"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Mail, MessageSquare, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const result = await sendContactEmail(data);
            if (result.success) {
                toast.success(result.message);
                reset();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800">
                            <h2 className="text-3xl font-bold text-white mb-6">Let&apos;s Secure Your App</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                Have questions about implementing SWT? Our security experts are ready to help you migrate from legacy token systems.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 transition-colors">
                                        <Mail className="w-5 h-5 text-blue-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Email Us</p>
                                        <p className="text-white font-medium">securewebtoken@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 transition-colors">
                                        <MessageSquare className="w-5 h-5 text-blue-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Live Chat</p>
                                        <p className="text-white font-medium">Available 24/7 for Enterprise</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-8 md:p-12">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Name</label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-zinc-800'} rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Email</label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-zinc-800'} rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Message</label>
                                    <textarea
                                        {...register("message")}
                                        rows={4}
                                        placeholder="Tell us about your project..."
                                        className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-zinc-800'} rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
