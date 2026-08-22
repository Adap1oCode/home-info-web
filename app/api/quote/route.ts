import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { company, quote } from "@/config/site";

/**
 * Quote builder submissions.
 *
 * NOTE ON ESCAPING
 * Every value that reaches the HTML email goes through esc(). The older
 * /api/contact route interpolates form input straight into its template, which
 * lets a submitter inject markup or links into the email the business receives.
 * That should be fixed there too — see docs/replacement-gap-check.md.
 */

const MAX_PRODUCTS = 40;
const MAX_LEN = 2000;

/** Strips CR/LF and caps length — user input must never shape a mail header. */
const header = (v: string) => v.replace(/[\r\n]+/g, " ").trim().slice(0, 120);

/** HTML-escape. Applied to every user-supplied value without exception. */
const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type Incoming = {
  name?: string;
  firmName?: string;
  email?: string;
  phone?: string;
  volume?: string;
  note?: string;
  products?: { name?: string; supplier?: string | null; group?: string | null }[];
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Incoming;
    const { name, firmName, email, phone, volume, note, products } = body;

    if (!name || !firmName || !email || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Please give us your name, your firm, an email address and at least one report." },
        { status: 400 },
      );
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
    }

    if (products.length > MAX_PRODUCTS) {
      return NextResponse.json({ error: "Too many reports selected." }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("[api/quote] SMTP not configured");
      return NextResponse.json(
        { error: "We could not send that just now. Please call us instead." },
        { status: 500 },
      );
    }

    const band = quote.volumeBands.find((b) => b.id === volume);
    const volumeLabel = band?.label ?? "Not stated";
    const trimmedNote = (note ?? "").slice(0, MAX_LEN);

    // group the selection so the email reads the way the catalogue does
    const byGroup = new Map<string, { name: string; supplier: string | null }[]>();
    for (const p of products) {
      const g = p.group || "Other";
      if (!byGroup.has(g)) byGroup.set(g, []);
      byGroup.get(g)!.push({ name: String(p.name ?? "").slice(0, 200), supplier: p.supplier ?? null });
    }

    const rows = Array.from(byGroup.entries())
      .map(
        ([group, items]) => `
        <tr>
          <td style="padding:14px 12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;color:#16222E;vertical-align:top;width:190px;">
            ${esc(group)}
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #DCE5EF;color:#54626F;">
            ${items
              .map(
                (i) =>
                  `<div style="margin-bottom:6px;">${esc(i.name)}${
                    i.supplier ? ` <span style="color:#8593A0;">— ${esc(i.supplier)}</span>` : ""
                  }</div>`,
              )
              .join("")}
          </td>
        </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en-GB"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#F7F9FC;">
  <table role="presentation" style="width:100%;border-collapse:collapse;padding:24px;">
    <tr><td align="center">
      <table role="presentation" style="width:640px;max-width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;">
        <tr><td style="background:#0D1F33;padding:26px 30px;">
          <h1 style="margin:0;color:#fff;font-size:20px;">Quote request — ${esc(firmName)}</h1>
          <p style="margin:8px 0 0;color:#8FC2EC;font-size:14px;">
            ${products.length} report${products.length === 1 ? "" : "s"} · ${esc(volumeLabel)}
          </p>
        </td></tr>

        <tr><td style="padding:26px 30px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:22px;">
            <tr><td style="padding:12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;width:150px;">Name</td>
                <td style="padding:12px;border-bottom:1px solid #DCE5EF;">${esc(name)}</td></tr>
            <tr><td style="padding:12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;">Firm</td>
                <td style="padding:12px;border-bottom:1px solid #DCE5EF;">${esc(firmName)}</td></tr>
            <tr><td style="padding:12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;">Email</td>
                <td style="padding:12px;border-bottom:1px solid #DCE5EF;"><a href="mailto:${esc(email)}" style="color:#1B6EBE;">${esc(email)}</a></td></tr>
            <tr><td style="padding:12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;">Phone</td>
                <td style="padding:12px;border-bottom:1px solid #DCE5EF;">${esc(phone) || "—"}</td></tr>
            <tr><td style="padding:12px;background:#F7F9FC;border-bottom:1px solid #DCE5EF;font-weight:700;">Volume</td>
                <td style="padding:12px;border-bottom:1px solid #DCE5EF;">${esc(volumeLabel)}</td></tr>
          </table>

          <h2 style="margin:0 0 12px;font-size:16px;color:#16222E;">What they selected</h2>
          <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>

          ${
            trimmedNote
              ? `<h2 style="margin:24px 0 8px;font-size:16px;color:#16222E;">Their note</h2>
                 <p style="margin:0;color:#54626F;line-height:1.6;">${esc(trimmedNote).replace(/\n/g, "<br>")}</p>`
              : ""
          }

          <div style="margin-top:26px;padding:16px 18px;background:#EAF2FB;border-left:4px solid #348CDC;">
            <p style="margin:0;color:#1B6EBE;font-size:14px;line-height:1.6;">
              They were told we would come back within ${esc(quote.respondWithin)}. Reply to this
              email to reach them directly.
            </p>
          </div>
        </td></tr>

        <tr><td style="padding:18px 30px;background:#F7F9FC;border-top:1px solid #DCE5EF;text-align:center;">
          <p style="margin:0;color:#8593A0;font-size:12px;">Sent from the quote builder · ${esc(company.legalName)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    const text = [
      `Quote request — ${firmName}`,
      `${products.length} report(s) · ${volumeLabel}`,
      "",
      `Name:  ${name}`,
      `Firm:  ${firmName}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Volume: ${volumeLabel}`,
      "",
      "Selected:",
      ...Array.from(byGroup.entries()).flatMap(([g, items]) => [
        `  ${g}`,
        ...items.map((i) => `    - ${i.name}${i.supplier ? ` (${i.supplier})` : ""}`),
      ]),
      ...(trimmedNote ? ["", "Note:", trimmedNote] : []),
    ].join("\n");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASSWORD.trim().replace(/\s+/g, " "),
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: header(
        `Quote request — ${firmName} — ${products.length} report${products.length === 1 ? "" : "s"}, ${volumeLabel}`,
      ),
      text,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[api/quote] failed:", error);
    return NextResponse.json(
      { error: "We could not send that just now. Please call us instead." },
      { status: 500 },
    );
  }
}
