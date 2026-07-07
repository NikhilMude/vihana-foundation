"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";

const interests = ["Birthday Campaign", "Volunteer", "Donation", "Partnership", "General"];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      interest: String(formData.get("interest") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (requestError) {
      setStatus("error");
      setError(requestError instanceof Error ? requestError.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/8 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-bold text-slate-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-bold text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-bold text-slate-800">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label htmlFor="interest" className="text-sm font-bold text-slate-800">
            I want to help with
          </label>
          <select
            id="interest"
            name="interest"
            required
            defaultValue="Birthday Campaign"
            className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
          >
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-bold text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
          placeholder="Tell us how you would like to support Vihana Foundation."
        />
      </div>

      {status === "success" ? (
        <div className="mt-5 flex items-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 className="h-5 w-5" />
          Thank you. We received your message.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-5 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800"
      >
        {status === "loading" ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        Send Message
      </Button>
    </form>
  );
}
