"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
    try {
        const validated = contactSchema.parse(formData);

        if (!process.env.RESEND_API_KEY) {
            console.log("Mock email sent (No API Key):", validated);
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, message: "Message received! (Mock mode)" };
        }

        const { data, error } = await resend.emails.send({
            from: "SWT Contact Form <onboarding@resend.dev>",
            to: ["securewebtoken@gmail.com"],
            subject: `New Contact Message from ${validated.name}`,
            text: `Name: ${validated.name}\nEmail: ${validated.email}\n\nMessage:\n${validated.message}`,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: "Failed to send email. Please try again later." };
        }

        return { success: true, message: "Thank you! Your message has been sent." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
