type EmailInput = {
  to: string;
  from?: string;
  subject: string;
  html: string;
};

export function renderEmailTemplate(template: string, values: Record<string, string | number | undefined>) {
  return template.replace(/\{\{\s*([\w]+)\s*\}\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function textToEmailHtml(value: string) {
  return value
    .split("\n")
    .map((line) => `<p>${escapeHtml(line) || "&nbsp;"}</p>`)
    .join("");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmail({ to, from: selectedFrom, subject, html }: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = selectedFrom || process.env.EMAIL_FROM || "Vihana Foundation <onboarding@resend.dev>";

  if (!apiKey) {
    return { ok: false, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    return { ok: false, skipped: false, status: response.status, error };
  }

  return { ok: true, skipped: false, status: response.status };
}
