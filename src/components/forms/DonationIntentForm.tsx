"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Heart, Info, Loader2, LogIn, Send, UserRound } from "lucide-react";

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
    <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[8px] border border-amber-300 bg-white p-5 shadow-xl shadow-slate-900/8 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          {["Indian Citizen", "Foreign Citizen / OCI"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDonorType(type)}
              className={`flex h-14 items-center justify-center gap-2 rounded-[8px] border text-sm font-bold transition sm:text-base ${
                donorType === type
                  ? "border-emerald-400 bg-emerald-50 text-slate-950"
                  : "border-slate-300 bg-white text-slate-700 hover:border-teal-500"
              }`}
            >
              {donorType === type ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <span className="h-5 w-5 rounded-full border-2 border-slate-500" />}
              {type}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-semibold text-slate-800">
          <Info className="h-5 w-5 text-slate-700" />
          {donorType === "Indian Citizen" ? "For Indian passport holders" : "For foreign citizens and OCI supporters"}
        </div>

        <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-[8px] bg-slate-100">
          {["One Time", "Monthly"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFrequency(option)}
              className={`flex h-14 items-center justify-center gap-3 text-base font-bold transition ${
                frequency === option ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Heart className="h-6 w-6 fill-red-500 text-red-500" />
              {option}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid grid-cols-3 gap-3">
            {amounts.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAmount(option)}
                className={`h-12 rounded-[8px] text-base font-bold transition ${
                  amount === option ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950 hover:bg-slate-200"
                }`}
              >
                INR {Number(option).toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
            <label className="text-sm font-bold leading-6 text-slate-700">
              Enter your own amount <span className="text-rose-600">*</span>
            </label>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value.replace(/[^\d]/g, ""))}
              required
              inputMode="numeric"
              className="h-12 rounded-[8px] border border-amber-400 bg-white px-4 text-base outline-none focus:border-teal-600"
              placeholder="5000"
            />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[0.8fr_1.2fr]">
            <label className="text-sm font-bold leading-6 text-slate-700">
              I pledge my support for <span className="text-rose-600">*</span>
            </label>
            <select
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className="h-12 rounded-[8px] border border-slate-300 bg-white px-4 text-base outline-none focus:border-teal-600"
            >
              {purposes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <input name="name" required placeholder="Full name" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
            <input name="email" required type="email" placeholder="Email" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
            <input name="phone" placeholder="Phone" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
            <select name="method" defaultValue="UPI" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>QR Code</option>
              <option>Cheque</option>
            </select>
            <input name="transactionId" placeholder="Transaction/reference ID if paid" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
            <select name="receiptRequired" defaultValue="Yes" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
              <option>Yes</option>
              <option>No</option>
            </select>
            <input name="pan" placeholder="PAN for receipt / 80G record" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 uppercase outline-none focus:border-teal-600" />
            <input name="address" placeholder="Address for receipt records" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
          </div>
          <textarea name="message" rows={3} placeholder="Message or dedication" className="mt-3 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />

          {status === "success" ? (
            <p className="mt-4 flex items-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
              Donation pledge recorded. Please login to see it in your donor account.
            </p>
          ) : null}

          {status === "error" ? <p className="mt-4 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</p> : null}

          <Button disabled={status === "loading"} className="mt-5 h-12 w-full rounded-[8px] bg-slate-950 px-7 text-base hover:bg-slate-800">
            {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
            Proceed to Donate
          </Button>
        </form>

        <div className="mt-5 rounded-[8px] border border-dashed border-amber-400 bg-amber-50 p-4 text-center text-sm leading-7 text-slate-700">
          Donors seeking tax-exemption records should add PAN and address. Official 80G/12A details must be updated after legal verification.
          <span className="mt-2 block font-bold text-rose-600">No refunds should be promised until your final refund policy is legally reviewed.</span>
        </div>

        <Button asChild className="mt-5 h-12 w-full rounded-[8px] bg-amber-400 text-base text-slate-950 hover:bg-amber-300">
          <SmartNavLink href="/donor">
            <LogIn className="mr-2 h-5 w-5" />
            Donor Login
          </SmartNavLink>
        </Button>
      </div>

      <div className="rounded-[8px] bg-slate-950 p-5 text-white sm:p-6">
        <UserRound className="h-10 w-10 text-amber-300" />
        <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-bold">Donor account benefits</h3>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-300">
          <p>Track every pledge and self-reported transaction connected to your email.</p>
          <p>Download donation history for your own records.</p>
          <p>Save PAN, address and donor type for future receipt workflows.</p>
          <p>Monthly giving is recorded now and can later be connected to Razorpay subscriptions.</p>
        </div>
      </div>
    </div>
  );
}
