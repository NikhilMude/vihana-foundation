"use client";

import { FormEvent, useMemo, useState } from "react";
import { BadgeCheck, Download, HeartHandshake, Info, Loader2, LogIn, LogOut, ReceiptText, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/Button";

type Donor = {
  name: string;
  email: string;
  phone: string;
  donorType: string;
  pan: string;
  address: string;
};

type Donation = {
  id: string;
  amount?: string;
  method?: string;
  transactionId?: string;
  donorType?: string;
  frequency?: string;
  purpose?: string;
  receiptRequired?: string;
  receiptNumber?: string;
  receiptStatus?: string;
  receiptIssuedAt?: string;
  status?: string;
  createdAt?: string;
};

type DonorPortalProps = {
  donor: Donor | null;
  donations: Donation[];
};

function toNumber(value?: string) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function downloadCsv(filename: string, rows: Record<string, string | number | undefined>[]) {
  const headers = Object.keys(rows[0] || { empty: "" });
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DonorPortal({ donor, donations }: DonorPortalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [foreignNotice, setForeignNotice] = useState("");
  const total = useMemo(() => donations.reduce((sum, item) => sum + toNumber(item.amount), 0), [donations]);
  const receiptsRequested = useMemo(() => donations.filter((item) => item.receiptRequired === "Yes").length, [donations]);

  async function submitAuth(event: FormEvent<HTMLFormElement>, endpoint: string) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const result = (await response.json()) as { ok: boolean; message?: string };
    setLoading(false);

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Please try again.");
      return;
    }

    window.location.href = "/donor";
  }

  async function logout() {
    await fetch("/api/donor/logout", { method: "POST" });
    window.location.href = "/donor";
  }

  if (donor) {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr] lg:gap-5">
        <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-xs sm:tracking-[0.22em]">Donor Account</p>
              <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold capitalize leading-tight text-slate-950 sm:mt-2 sm:text-4xl">
                {donor.name}
              </h1>
            </div>
            <Button type="button" variant="outline" onClick={logout} className="h-9 rounded-full px-3 text-xs sm:h-10 sm:text-sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="mt-3 rounded-[8px] bg-[linear-gradient(135deg,#ecfeff,#fff7ed)] p-3 sm:mt-5 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 sm:h-5 sm:w-5" />
              <p className="text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                Your donor profile is connected to donation pledges submitted with this email.
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-600 sm:mt-5 sm:gap-3 sm:text-sm sm:leading-6">
            {[
              ["Email", donor.email],
              ["Phone", donor.phone || "Not added"],
              ["Type", donor.donorType || "Indian Citizen"],
              ["PAN", donor.pan || "Not added"],
              ["Address", donor.address || "Not added"],
            ].map(([label, value]) => (
              <p key={label} className="rounded-[8px] bg-slate-50 px-3 py-2 sm:px-4 sm:py-3">
                <span className="font-bold text-slate-900">{label}:</span> {value}
              </p>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            <div className="rounded-[8px] bg-teal-50 p-3 sm:p-4">
              <p className="text-lg font-black text-teal-700 sm:text-2xl">INR {total.toLocaleString("en-IN")}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Total</p>
            </div>
            <div className="rounded-[8px] bg-amber-50 p-3 sm:p-4">
              <p className="text-lg font-black text-amber-700 sm:text-2xl">{donations.length}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Gifts</p>
            </div>
            <div className="rounded-[8px] bg-sky-50 p-3 sm:p-4">
              <p className="text-lg font-black text-sky-700 sm:text-2xl">{receiptsRequested}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">Receipts</p>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-xs sm:tracking-[0.22em]">Donation History</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950 sm:mt-2 sm:text-2xl">Donation dashboard</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadCsv("vihana-donor-transactions.csv", donations)}
              className="h-9 rounded-full px-4 text-xs sm:h-10 sm:text-sm"
              disabled={!donations.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="mt-3 grid gap-2 sm:mt-5 sm:gap-3">
            {donations.length ? (
              donations.map((donation) => (
                <div key={donation.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-3 transition hover:border-teal-200 hover:bg-white hover:shadow-sm sm:p-4">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <h3 className="flex items-center gap-2 font-bold text-slate-950">
                        <ReceiptText className="h-4 w-4 text-teal-700" />
                        INR {Number(toNumber(donation.amount)).toLocaleString("en-IN")}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{donation.purpose || "General Fund"} | {donation.frequency || "One Time"}</p>
                    </div>
                    <p className="h-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">{donation.status || "Recorded"}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-slate-600 sm:mt-3 sm:gap-2 sm:text-sm">
                    <p><span className="font-bold text-slate-800">Method:</span> {donation.method}</p>
                    <p><span className="font-bold text-slate-800">Reference:</span> {donation.transactionId}</p>
                    <p><span className="font-bold text-slate-800">Receipt:</span> {donation.receiptRequired || "No"}</p>
                    <p><span className="font-bold text-slate-800">Date:</span> {formatDate(donation.createdAt)}</p>
                  </div>
                  <div className="mt-3 rounded-[8px] border border-teal-100 bg-white p-3 sm:mt-4 sm:p-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">Receipt</p>
                        <h4 className="mt-1 font-bold text-slate-950">{donation.receiptNumber || "Receipt pending"}</h4>
                        <p className="mt-1 text-sm text-slate-500">{donation.receiptStatus || "Provisional receipt generated"}</p>
                      </div>
                      <Button asChild type="button" variant="outline" className="h-9 rounded-full px-4 text-xs sm:h-10 sm:text-sm">
                        <a href={`/api/donor/receipt?id=${encodeURIComponent(donation.id)}`}>
                          <Download className="mr-2 h-4 w-4" />
                          PDF Receipt
                        </a>
                      </Button>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500 sm:mt-3">
                      Provisional acknowledgement for your records. Official tax receipt depends on verified payment and compliance setup.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-dashed border-slate-300 p-5 text-center text-sm text-slate-600 sm:p-8">
                No donations are linked to your account yet.
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
      <section className="rounded-[8px] bg-slate-950 p-4 text-white shadow-xl shadow-slate-900/15 sm:p-8">
        <HeartHandshake className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10" />
        <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight sm:mt-5 sm:text-5xl">
          Donor account
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
          Create an account to keep your donation history, download records and prepare receipt information in one place.
        </p>
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-2 rounded-[8px] bg-slate-100 p-1">
          <button type="button" onClick={() => setMode("login")} className={`h-10 rounded-[8px] text-sm font-bold ${mode === "login" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Login
          </button>
          <button type="button" onClick={() => setMode("register")} className={`h-10 rounded-[8px] text-sm font-bold ${mode === "register" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Create Account
          </button>
        </div>

        <form onSubmit={(event) => submitAuth(event, mode === "register" ? "/api/donor/register" : "/api/donor/login")} className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
          {mode === "register" ? (
            <>
              <input name="name" required placeholder="Full name" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <input name="phone" placeholder="Phone" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <input type="hidden" name="donorType" value="Indian Citizen" />
              <div className="rounded-[8px] border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-900 sm:px-4 sm:py-3 sm:text-sm">
                Indian citizen donor account
              </div>
              <button
                type="button"
                onClick={() => setForeignNotice("Foreign citizen / OCI donor accounts are currently unavailable while compliance and payment setup is being updated. Please contact Vihana Foundation for volunteering, partnership, or non-financial support.")}
                className="rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs font-bold text-amber-900 transition hover:bg-amber-100 sm:px-4 sm:py-3 sm:text-sm"
              >
                Foreign citizen / OCI supporter?
              </button>
              {foreignNotice ? (
                <div className="flex items-start gap-2 rounded-[8px] bg-rose-50 px-3 py-2 text-xs font-semibold leading-5 text-rose-900 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  {foreignNotice}
                </div>
              ) : null}
              <input name="pan" placeholder="PAN (optional)" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
              <textarea name="address" rows={2} placeholder="Address for receipt records" className="rounded-[8px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-teal-600 sm:px-4 sm:py-3 sm:text-base" />
            </>
          ) : null}
          <input name="email" required type="email" placeholder="Email" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />
          <input name="password" required type="password" minLength={8} placeholder="Password" className="h-10 rounded-[8px] border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-4 sm:text-base" />

          {status ? <p className="rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{status}</p> : null}

          <Button disabled={loading} className="h-11 rounded-full bg-teal-700 text-sm hover:bg-teal-800 sm:h-12 sm:text-base">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : mode === "register" ? <UserPlus className="mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
            {mode === "register" ? "Create Donor Account" : "Login"}
          </Button>
        </form>
      </section>
    </div>
  );
}
