"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Newsletter({ content }: { content: SiteContent }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: String(formData.get("email") || "") }),
    });
    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus("error");
      setError(result.message || "Could not subscribe.");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <section className="bg-white py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-[8px] border border-slate-200 bg-stone-50 p-4 text-center shadow-sm sm:p-8">
            <Mail className="mx-auto h-8 w-8 text-teal-700 sm:h-10 sm:w-10" />
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.65rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-4xl">
              {content.newsletterHeading}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-5 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">{content.newsletterDescription}</p>
            <form onSubmit={handleSubmit} className="mx-auto mt-4 flex max-w-xl flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <input
                name="email"
                required
                type="email"
                placeholder={content.newsletterPlaceholder}
                className="h-10 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-teal-600 sm:h-12 sm:px-5 sm:text-base"
              />
              <Button disabled={status === "loading"} className="h-10 rounded-full bg-teal-700 px-6 text-sm hover:bg-teal-800 sm:h-12 sm:px-7 sm:text-base">
                {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {content.newsletterButtonText}
              </Button>
            </form>
            {status === "success" ? (
              <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 rounded-[8px] bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="h-5 w-5" />
                Thank you for subscribing.
              </p>
            ) : null}
            {status === "error" ? <p className="mx-auto mt-4 max-w-xl rounded-[8px] bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</p> : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

