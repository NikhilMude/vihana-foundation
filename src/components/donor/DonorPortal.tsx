"use client";

import { FormEvent, useMemo, useState } from "react";
import { Download, HeartHandshake, Loader2, LogIn, LogOut, UserPlus } from "lucide-react";

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
  const [mode, setMode] = useState<"login" | "register">(donor ? "login" : "register");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => donations.reduce((sum, item) => sum + toNumber(item.amount), 0), [donations]);

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
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Donor Account</p>
              <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold text-slate-950">
                {donor.name}
              </h1>
            </div>
            <Button type="button" variant="outline" onClick={logout} className="h-10 rounded-full">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="mt-6 grid gap-3 text-sm leading-6 text-slate-600">
            <p><span className="font-bold text-slate-900">Email:</span> {donor.email}</p>
            <p><span className="font-bold text-slate-900">Phone:</span> {donor.phone || "Not added"}</p>
            <p><span className="font-bold text-slate-900">Type:</span> {donor.donorType}</p>
            <p><span className="font-bold text-slate-900">PAN:</span> {donor.pan || "Not added"}</p>
            <p><span className="font-bold text-slate-900">Address:</span> {donor.address || "Not added"}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[8px] bg-teal-50 p-4">
              <p className="text-2xl font-black text-teal-700">INR {total.toLocaleString("en-IN")}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Total pledged</p>
            </div>
            <div className="rounded-[8px] bg-amber-50 p-4">
              <p className="text-2xl font-black text-amber-700">{donations.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Transactions</p>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Donation History</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Your transactions</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadCsv("vihana-donor-transactions.csv", donations)}
              className="h-10 rounded-full"
              disabled={!donations.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="mt-5 grid gap-3">
            {donations.length ? (
              donations.map((donation) => (
                <div key={donation.id} className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <h3 className="font-bold text-slate-950">INR {donation.amount}</h3>
                      <p className="mt-1 text-sm text-slate-500">{donation.purpose || "General Fund"} | {donation.frequency || "One Time"}</p>
                    </div>
                    <p className="text-sm font-bold text-teal-700">{donation.status}</p>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    <p><span className="font-bold text-slate-800">Method:</span> {donation.method}</p>
                    <p><span className="font-bold text-slate-800">Reference:</span> {donation.transactionId}</p>
                    <p><span className="font-bold text-slate-800">Receipt:</span> {donation.receiptRequired || "No"}</p>
                    <p><span className="font-bold text-slate-800">Date:</span> {donation.createdAt}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center text-slate-600">
                No donations are linked to your account yet.
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[8px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/15 sm:p-8">
        <HeartHandshake className="h-10 w-10 text-amber-300" />
        <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight sm:text-5xl">
          Donor account
        </h1>
        <p className="mt-4 leading-7 text-slate-300">
          Create an account to keep your donation history, download records and prepare receipt information in one place.
        </p>
      </section>

      <section className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid grid-cols-2 rounded-[8px] bg-slate-100 p-1">
          <button type="button" onClick={() => setMode("register")} className={`h-11 rounded-[8px] text-sm font-bold ${mode === "register" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Create Account
          </button>
          <button type="button" onClick={() => setMode("login")} className={`h-11 rounded-[8px] text-sm font-bold ${mode === "login" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600"}`}>
            Login
          </button>
        </div>

        <form onSubmit={(event) => submitAuth(event, mode === "register" ? "/api/donor/register" : "/api/donor/login")} className="mt-5 grid gap-3">
          {mode === "register" ? (
            <>
              <input name="name" required placeholder="Full name" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
              <input name="phone" placeholder="Phone" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
              <select name="donorType" defaultValue="Indian Citizen" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600">
                <option>Indian Citizen</option>
                <option>Foreign Citizen / OCI</option>
              </select>
              <input name="pan" placeholder="PAN (optional)" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
              <textarea name="address" rows={3} placeholder="Address for receipt records" className="rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-teal-600" />
            </>
          ) : null}
          <input name="email" required type="email" placeholder="Email" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />
          <input name="password" required type="password" minLength={8} placeholder="Password" className="h-12 rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-600" />

          {status ? <p className="rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{status}</p> : null}

          <Button disabled={loading} className="h-12 rounded-full bg-teal-700 text-base hover:bg-teal-800">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : mode === "register" ? <UserPlus className="mr-2 h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
            {mode === "register" ? "Create Donor Account" : "Login"}
          </Button>
        </form>
      </section>
    </div>
  );
}
