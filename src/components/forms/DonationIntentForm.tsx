"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, FileText, Heart, Info, Loader2, LogIn, Send, ShieldCheck, Sparkles } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Button } from "@/components/ui/Button";

const amounts = ["5000", "10000", "20000"];
const purposes = ["Child Education", "Nutritious Meals", "Health Support", "Birthday Campaign", "General Fund"];

export default function DonationIntentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [donorType, setDonorType] = useState("Indian Citizen");
  const [frequency, setFrequency] = useState("One Time");
  const [amount, setAmount] = useState("5000");
  const [purpose, setPurpose] = useState("Child Education");
  const foreignDonationBlocked = donorType === "Foreign Citizen / OCI";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (foreignDonationBlocked) {
      setStatus("error");
      setError("We are not accepting foreign citizen or OCI donations at this time. Please contact Vihana Foundation for partnership or non-financial support options.");
      return;
    }

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
        amount,
        method: String(formData.get("method") || ""),
        transactionId: String(formData.get("transactionId") || ""),
        message: String(formData.get("message") || ""),
        donorType,
        frequency,
        purpose,
        pan: String(formData.get("pan") || ""),
        address: String(formData.get("address") || ""),
        receiptRequired: String(formData.get("receiptRequired") || "No"),
      }),
    });

    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus("error");
      setError(result.message || "Could not record donation.");
      return;
    }

    form.reset();
    setAmount("5000");
    setPurpose("Child Education");
    setStatus("success");
  }

  return (
    <div className="mt-4 grid items-start gap-4 lg:mt-7 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/8 sm:p-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {["Indian Citizen", "Foreign Citizen / OCI"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDonorType(type)}
              className={`flex h-11 items-center justify-center gap-1.5 rounded-[8px] border px-2 text-xs font-bold transition sm:h-14 sm:gap-2 sm:text-base ${
                donorType === type
                  ? type === "Foreign Citizen / OCI"
                    ? "border-amber-400 bg-amber-50 text-amber-900"
                    : "border-teal-600 bg-teal-50 text-teal-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:bg-teal-50/50"
              }`}
            >
              {donorType === type ? (
                <CheckCircle2 className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${type === "Foreign Citizen / OCI" ? "text-amber-600" : "text-teal-600"}`} />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-slate-400 sm:h-5 sm:w-5" />
              )}
              <span className="min-w-0 leading-4">{type}</span>
            </button>
          ))}
        </div>

        <div className={`mt-3 flex items-start gap-2 rounded-[8px] px-3 py-2 text-xs font-semibold leading-5 sm:mt-4 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm ${
          foreignDonationBlocked ? "bg-rose-50 text-rose-900" : "bg-amber-50 text-slate-800"
        }`}>
          <Info className="h-4 w-4 shrink-0 text-slate-700 sm:h-5 sm:w-5" />
          <span>
            {donorType === "Indian Citizen"
              ? "For Indian passport holders. You may proceed with a domestic donation pledge."
              : "Currently we cannot accept donations from foreign citizens or OCI supporters. We are updating our compliance process and payment setup. You may still contact us for volunteering, partnerships or non-financial support."}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-[8px] bg-slate-100 sm:mt-5">
          {["One Time", "Monthly"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFrequency(option)}
              className={`flex h-11 items-center justify-center gap-2 text-sm font-bold transition sm:h-14 sm:gap-3 sm:text-base ${
                frequency === option ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${frequency === option ? "fill-amber-300 text-amber-300" : "fill-rose-500 text-rose-500"}`} />
              {option}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 sm:mt-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {amounts.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAmount(option)}
                className={`h-10 rounded-[8px] text-xs font-bold transition sm:h-12 sm:text-base ${
                  amount === option ? "bg-teal-700 text-white shadow-sm" : "bg-slate-100 text-slate-950 hover:bg-teal-50 hover:text-teal-800"
                }`}
              >
                INR {Number(option).toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="mt-3 grid gap-2 md:grid-cols-[0.8fr_1.2fr]">
            <label className="text-xs font-bold leading-5 text-slate-700 sm:text-sm sm:leading-6">
              Enter your own amount <span className="text-rose-600">*</span>
            </label>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value.replace(/[^\d]/g, ""))}
              required
              inputMode="numeric"
              className="h-10 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base"
              placeholder="5000"
            />
          </div>

          <div className="mt-3 grid gap-2 md:grid-cols-[0.8fr_1.2fr]">
            <label className="text-xs font-bold leading-5 text-slate-700 sm:text-sm sm:leading-6">
              I pledge my support for <span className="text-rose-600">*</span>
            </label>
            <select
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className="h-10 rounded-[8px] border border-slate-300 bg-white px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base"
            >
              {purposes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2 sm:gap-3 sm:mt-5">
            <input name="name" required placeholder="Full name" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
            <input name="email" required type="email" placeholder="Email" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
            <input name="phone" placeholder="Phone" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
            <select name="method" defaultValue="UPI" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base">
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>QR Code</option>
              <option>Cheque</option>
            </select>
            <input name="transactionId" placeholder="Transaction/reference ID if paid" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
            <select name="receiptRequired" defaultValue="Yes" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base">
              <option>Yes</option>
              <option>No</option>
            </select>
            <input name="pan" placeholder="PAN for receipt / 80G record" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm uppercase outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
            <input name="address" placeholder="Address for receipt records" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
          </div>
          <textarea name="message" rows={2} placeholder="Message or dedication" className="mt-2 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-600 sm:mt-3 sm:px-4 sm:py-3 sm:text-base" />

          {status === "success" ? (
            <p className="mt-4 flex items-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
              Donation pledge recorded. Please login to see it in your donor account.
            </p>
          ) : null}

          {status === "error" ? <p className="mt-4 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</p> : null}

          <Button disabled={status === "loading" || foreignDonationBlocked} className="mt-4 h-11 w-full rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 disabled:bg-slate-300 disabled:text-slate-600 sm:mt-5 sm:h-12 sm:px-7 sm:text-base">
            {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
            {foreignDonationBlocked ? "Foreign / OCI Donations Unavailable" : "Proceed to Donate"}
          </Button>
        </form>

        <div className="mt-4 rounded-[8px] border border-dashed border-amber-400 bg-amber-50 p-3 text-center text-xs leading-5 text-slate-700 sm:mt-5 sm:p-4 sm:text-sm sm:leading-7">
          Donors seeking tax-exemption records should add PAN and address. Official 80G/12A details must be updated after legal verification.
          <span className="mt-2 block font-bold text-rose-600">No refunds should be promised until your final refund policy is legally reviewed.</span>
        </div>

        <Button asChild variant="outline" className="mt-4 h-11 w-full rounded-full border-teal-200 bg-teal-50 text-sm text-teal-800 hover:bg-teal-100 sm:mt-5 sm:h-12 sm:text-base">
          <SmartNavLink href="/donor">
            <LogIn className="mr-2 h-5 w-5" />
            Donor Login
          </SmartNavLink>
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4">
        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-[linear-gradient(135deg,#ecfeff,#fff7ed)] p-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-teal-700 shadow-sm sm:h-12 sm:w-12">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold leading-tight text-slate-950 sm:mt-5 sm:text-3xl">
              Give with clarity, track with confidence.
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:leading-7">
              Donor accounts keep pledges, receipt details and contribution history organized in one private place.
            </p>
          </div>

          <div className="grid gap-2 p-4 sm:gap-3 sm:p-6">
            {[
              ["Track pledges", "Every self-reported donation connected to your email appears in your dashboard."],
              ["Download records", "Export your donation history whenever you need it."],
              ["Prepare receipts", "Save PAN, address and donor type for future receipt workflows."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[8px] border border-slate-200 bg-stone-50 p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <div>
                    <p className="font-bold text-slate-950">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-slate-700 shadow-sm sm:p-5 sm:text-sm sm:leading-7">
          <div className="flex items-start gap-3">
            <FileText className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
            <p>
              Monthly giving and receipt generation are prepared in the system. They can be connected to Razorpay subscriptions and verified 80G receipts after payment gateway and legal setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
