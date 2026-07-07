"use client";

import { FormEvent, useState } from "react";
import { Lock, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setLoading(false);
      setError("Password is incorrect.");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md rounded-[8px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/8">
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-700 text-white">
        <Lock className="h-5 w-5" />
      </div>

      <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-slate-950">
        Vihana CMS
      </h1>

      <p className="mt-2 leading-7 text-slate-600">
        Login to update website content, gallery photos and view received messages.
      </p>

      <label htmlFor="password" className="mt-6 block text-sm font-bold text-slate-800">
        Admin password
      </label>

      <input
        id="password"
        name="password"
        type="password"
        required
        className="mt-2 h-12 w-full rounded-[8px] border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-teal-600 focus:bg-white"
        placeholder="Enter password"
      />

      {error ? <p className="mt-4 rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{error}</p> : null}

      <Button disabled={loading} className="mt-5 h-12 w-full rounded-full bg-teal-700 text-base hover:bg-teal-800">
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        Login
      </Button>
    </form>
  );
}
