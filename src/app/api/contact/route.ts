import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  company_website?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.company_website) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Mail is not configured." }, { status: 503 });

  const idempotencyKey = createHash("sha256").update(`${email}\n${message}`).digest("hex");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM ?? "Rovelle Studio <hello@rovelle.studio>",
      to: process.env.RESEND_TO ?? "hello@rovelle.studio",
      replyTo: email,
      subject: `Rovelle — ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    },
    { idempotencyKey },
  );

  if (error) return NextResponse.json({ error: "The message did not send." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
