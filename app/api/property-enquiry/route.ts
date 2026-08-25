import { NextRequest, NextResponse } from "next/server";

import { graphMailConfigured, sendGraphMail } from "@/lib/email/send-graph-mail";

/**
 * The homepage postcode enquiry.
 *
 * Deliberately shorter than /api/quote. That form asks a solicitor to pick
 * report types before they have given us anything; this one asks for a
 * postcode and an email, and arrives with the council and water company
 * already resolved. It is the low-commitment end of the same funnel, not a
 * replacement for the quote builder.
 *
 * Sends as info@ over Graph, the same path the quote form uses, so there is one
 * mailer to keep working rather than two.
 */

/** Strip CR/LF before any value reaches a header. */
const header = (v: string) => v.replace(/[\r\n]+/g, " ").trim().slice(0, 120);

/** HTML-escape. Applied to every supplied value without exception. */
const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type Incoming = {
  postcode?: string;
  address?: string;
  council?: string;
  waterCompany?: string;
  name?: string;
  firmName?: string;
  email?: string;
  phone?: string;
  note?: string;
};

export async function POST(request: NextRequest) {
  try {
    const b = (await request.json()) as Incoming;
    const { postcode, address, council, waterCompany, name, firmName, email, phone, note } = b;

    if (!postcode?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Please give us the postcode and an email address." },
        { status: 400 },
      );
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
    }

    if (!graphMailConfigured() || !process.env.ENQUIRY_TO) {
      console.error("[api/property-enquiry] Graph mail not configured");
      return NextResponse.json(
        { error: "We could not send that just now. Please call us instead." },
        { status: 500 },
      );
    }

    /* Council and water company are echoed back from the lookup so the enquiry
       lands with the property already placed — whoever picks this up does not
       have to run the postcode again. Labelled as looked-up rather than
       supplied, because the reader typed neither of them. */
    const rows: [string, string | undefined][] = [
      ["Postcode", postcode],
      ["Address", address],
      ["Council (looked up)", council],
      ["Water company (looked up)", waterCompany],
      ["Name", name],
      ["Firm", firmName],
      ["Email", email],
      ["Phone", phone],
    ];
    const present = rows.filter(([, v]) => v && String(v).trim());

    const text = [
      "Property enquiry from the homepage",
      "",
      ...present.map(([k, v]) => `${k}: ${v}`),
      ...(note?.trim() ? ["", "Note:", note.trim()] : []),
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#16222e">
        <h2 style="font-size:17px;margin:0 0 14px">Property enquiry from the homepage</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${present
            .map(
              ([k, v]) =>
                `<tr><td style="padding:5px 18px 5px 0;color:#54626f">${esc(k)}</td><td style="padding:5px 0;font-weight:600">${esc(v)}</td></tr>`,
            )
            .join("")}
        </table>
        ${note?.trim() ? `<p style="margin:16px 0 0"><b>Note:</b><br>${esc(note.trim()).replace(/\n/g, "<br>")}</p>` : ""}
      </div>`;

    await sendGraphMail({
      to: process.env.ENQUIRY_TO,
      replyTo: email,
      subject: header(
        `Property enquiry — ${postcode}${council ? ` — ${council}` : ""}${firmName ? ` — ${firmName}` : ""}`,
      ),
      text,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[api/property-enquiry] failed:", error);
    return NextResponse.json(
      { error: "We could not send that just now. Please call us instead." },
      { status: 500 },
    );
  }
}
