"use client";

import { FormEvent, useState } from "react";

const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (staticExport) {
      setStatus("error");
      setMessage("Mail is unavailable in the static export.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
        company_website: form.get("company_website"),
      }),
    });
    if (response.ok) {
      setStatus("sent");
      setMessage("Received. We reply within two working days.");
      event.currentTarget.reset();
      return;
    }
    setStatus("error");
    setMessage("The message did not send. Write to hello@rovelle.studio.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border-t border-line pt-8">
      <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">(05) Write</p>
      <label className="grid gap-1 text-[12px] tracking-[0.08em] uppercase">
        Name
        <input name="name" required className="border-b border-line bg-transparent py-2 text-[18px] tracking-normal normal-case" />
      </label>
      <label className="grid gap-1 text-[12px] tracking-[0.08em] uppercase">
        Email
        <input name="email" type="email" required className="border-b border-line bg-transparent py-2 text-[18px] tracking-normal normal-case" />
      </label>
      <label className="grid gap-1 text-[12px] tracking-[0.08em] uppercase">
        Message
        <textarea name="message" required rows={4} className="border-b border-line bg-transparent py-2 text-[18px] tracking-normal normal-case" />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Company website
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-fit rounded-full bg-ink px-[34px] py-5 text-[18px] font-semibold tracking-[0.01em] text-canvas uppercase"
      >
        {status === "sending" ? "Sending" : "Send ↗"}
      </button>
      {message ? <p role="status">{message}</p> : null}
    </form>
  );
}
