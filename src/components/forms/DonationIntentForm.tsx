"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, FileText, Heart, Info, Loader2, LogIn, Send, ShieldCheck } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Button } from "@/components/ui/Button";

const amounts = ["500", "1000", "2500", "5000"];
const purposes = ["General Fund", "Child Education", "Nutritious Meals", "Health Support", "Birthday Campaign"];

type DonorSession = {
  authenticated: boolean;
  name?: string;
  email?: string;
  phone?: string;
  pan?: string;
  address?: string;
};

export default function DonationIntentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [session, setSession] = useState<DonorSession>({ authenticated: false });
  const [amount, setAmount] = useState("1000");
  const [frequency, setFrequency] = useState("One Time");
  const [purpose, setPurpose] = useState("General Fund");
  const [receiptRequired, setReceiptRequired] = useState("Yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");
  const [foreignNotice, setForeignNotice] = useState(false);

  useEffect(() => {
    let alive = true;

    fetch("/api/donor/session")
      .then((response) => response.json())
      .then((data: DonorSession) => {
        if (!alive || !data.authenticated) {
          return;
        }

        setSession(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setPan(data.pan || "");
        setAddress(data.address || "");
      })
      .catch(() => undefined);

    return () => {
      alive = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        amount,
        method: String(formData.get("method") || "UPI"),
        transactionId: String(formData.get("transactionId") || ""),
        message: String(formData.get("message") || ""),
        donorType: "Indian Citizen",
        frequency,
        purpose,
        pan,
        address,
        receiptRequired,
      }),
    });

    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus("error");
      setError(result.message || "Could not record donation.");
      return;
    }

    setStatus("success");
  }

  return (
    <div className="mt-4 grid items-start gap-4 lg:mt-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
      <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/8 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600">Donate</p>
            <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
              Make a pledge
            </h3>
          </div>
          {session.authenticated ? (
            <SmartNavLink href="/donor" className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-800">
              My dashboard
            </SmartNavLink>
          ) : (
            <Button asChild variant="outline" className="h-10 rounded-full border-teal-200 bg-teal-50 px-4 text-sm text-teal-800 hover:bg-teal-100">
              <SmartNavLink href="/donor">
                <LogIn className="mr-2 h-4 w-4" />
                Donor login
              </SmartNavLink>
            </Button>
          )}
        </div>

        {session.authenticated ? (
          <div className="mt-3 flex items-start gap-2 rounded-[8px] bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            Logged in as {session.name || session.email}. This pledge will appear in your donor dashboard.
          </div>
        ) : null}

        <div className="mt-3 rounded-[8px] bg-amber-50 px-3 py-2 text-xs leading-5 text-slate-700">
          <button type="button" onClick={() => setForeignNotice((value) => !value)} className="inline-flex items-center gap-2 font-bold text-slate-900">
            <Info className="h-4 w-4" />
            Indian citizen donations only
          </button>
          {foreignNotice ? (
            <p className="mt-2">
              Foreign citizen and OCI donations are currently unavailable while compliance and payment setup is being updated. Please contact us for volunteering or partnership support.
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <section>
            <div className="grid grid-cols-2 overflow-hidden rounded-[8px] bg-slate-100">
              {["One Time", "Monthly"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFrequency(option)}
                  className={`flex h-10 items-center justify-center gap-2 text-sm font-bold transition sm:h-11 ${
                    frequency === option ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${frequency === option ? "fill-amber-300 text-amber-300" : "fill-rose-500 text-rose-500"}`} />
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {amounts.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAmount(option)}
                  className={`h-10 rounded-[8px] text-sm font-bold transition ${
                    amount === option ? "bg-teal-700 text-white shadow-sm" : "bg-slate-100 text-slate-950 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                >
                  INR {Number(option).toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-[0.9fr_1.1fr]">
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^\d]/g, ""))}
                required
                inputMode="numeric"
                className="h-11 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600"
                placeholder="Custom amount"
              />
              <select
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                className="h-11 rounded-[8px] border border-slate-200 bg-white px-3 text-sm outline-none focus:border-teal-600"
              >
                {purposes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="grid gap-2 sm:grid-cols-2">
            <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Full name" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="Email" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
            <select name="method" defaultValue="UPI" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600">
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>QR Code</option>
              <option>Cheque</option>
            </select>
            <input name="transactionId" placeholder="Payment/reference ID, if paid" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
            <select value={receiptRequired} onChange={(event) => setReceiptRequired(event.target.value)} className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600">
              <option>Yes</option>
              <option>No</option>
            </select>
            {receiptRequired === "Yes" ? (
              <>
                <input value={pan} onChange={(event) => setPan(event.target.value.toUpperCase())} placeholder="PAN for receipt record" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm uppercase outline-none focus:border-teal-600" />
                <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address for receipt" className="h-11 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600" />
              </>
            ) : null}
          </section>

          <textarea name="message" rows={2} placeholder="Message or dedication" className="w-full rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-600" />

          {status === "success" ? (
            <p className="flex items-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
              Donation pledge recorded. Receipt and history are available in your donor dashboard.
            </p>
          ) : null}

          {status === "error" ? <p className="rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</p> : null}

          <Button disabled={status === "loading"} className="h-11 w-full rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 sm:h-12 sm:text-base">
            {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
            Record Donation
          </Button>
        </form>
      </div>

      <aside className="grid gap-3">
        <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-tight text-slate-950">Simple and transparent</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Submit the pledge after payment or before payment. The admin team can verify it, keep accounts updated and issue receipts from the dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[8px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-700 shadow-sm">
          <div className="flex items-start gap-3">
            <FileText className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
            <p>
              PAN and address help prepare receipt records. Final 80G/tax receipt wording should be updated after legal verification.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
