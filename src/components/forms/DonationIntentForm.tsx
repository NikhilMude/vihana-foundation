"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function DonationIntentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        amount: String(formData.get("amount") || ""),
        method: String(formData.get("method") || ""),
        transactionId: String(formData.get("transactionId") || ""),
        message: String(formData.get("message") || ""),
      }),
    });

    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus("error");
      setError(result.message || "Could not record donation.");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-950">Log a test donation</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This records a donation intent for testing. It is not a real payment gateway.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
        <input name="email" required type="email" placeholder="Email" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
        <input name="phone" placeholder="Phone" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
        <input name="amount" required placeholder="Amount, e.g. 501" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
        <select name="method" defaultValue="UPI" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>QR Code</option>
        </select>
        <input name="transactionId" placeholder="Transaction/reference ID" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
      </div>
      <textarea name="message" rows={3} placeholder="Message" className="mt-4 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />

      {status === "success" ? (
        <p className="mt-4 flex items-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          <CheckCircle2 className="h-5 w-5" />
          Donation intent recorded.
        </p>
      ) : null}

      {status === "error" ? <p className="mt-4 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</p> : null}

      <Button disabled={status === "loading"} className="mt-5 h-12 rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
        {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
        Record Donation
      </Button>
    </form>
  );
}
