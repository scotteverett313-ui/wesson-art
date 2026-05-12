"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire up to an email service (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="max-w-xl">
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(3rem,10vw,6rem)] leading-none tracking-widest uppercase text-white mb-4">
          Contact
        </h1>
        <p className="text-sm text-white/40 leading-relaxed mb-12">
          For commissions, exhibition inquiries, press, or general correspondence.
        </p>

        {status === "sent" ? (
          <div className="border border-white/10 p-8">
            <p className="font-[family-name:var(--font-anton)] text-2xl tracking-widest uppercase text-white mb-2">
              Message received.
            </p>
            <p className="text-sm text-white/40">
              Thank you for reaching out. I will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full border-b border-white/20 bg-black py-2 text-sm text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a subject</option>
                <option value="commission">Commission</option>
                <option value="print">Print Purchase</option>
                <option value="exhibition">Exhibition / Collaboration</option>
                <option value="press">Press</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Your message…"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send"}
              {status !== "sending" && <Send size={11} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
