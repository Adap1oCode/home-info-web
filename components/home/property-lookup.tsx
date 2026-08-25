"use client";

import { useState } from "react";
import Link from "next/link";

import type { PropertyLookup as Lookup } from "@/app/api/property-lookup/route";

/**
 * Postcode -> council, water company, our turnaround there -> enquiry.
 *
 * ── No price ────────────────────────────────────────────────────────────────
 * The panel deliberately carries no figure. A sell price is `council × price
 * band` and the band belongs to the customer, so there is no single price for a
 * council to publish — that is the point of having agreements. It shows what is
 * true for everybody, and asks for an email.
 *
 * The turnaround line is the part no competitor can print: our own completed
 * work, already published on the tracker, answering "how fast are you in MY
 * council" before anyone has spoken to us.
 */
export default function PropertyLookup({ className = "" }: { className?: string }) {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<Lookup | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    setSent(false);
    try {
      const res = await fetch(`/api/property-lookup?postcode=${encodeURIComponent(postcode)}`);
      const body = await res.json();
      if (!res.ok) setError(body.error ?? "We could not place that postcode.");
      else setResult(body as Lookup);
    } catch {
      setError("Something went wrong looking that up. Please try again, or call us.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSendError(null);
    try {
      const res = await fetch("/api/property-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postcode: result?.postcode,
          council: result?.council?.name,
          waterCompany: result?.waterCompany,
          email,
          firmName,
        }),
      });
      const body = await res.json();
      if (!res.ok) setSendError(body.error ?? "We could not send that. Please call us instead.");
      else setSent(true);
    } catch {
      setSendError("Something went wrong sending that. Please call us instead.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-white/45 focus:bg-white/12";

  return (
    <div className={className}>
      <form onSubmit={lookup} className="flex gap-2.5 max-[520px]:flex-col">
        <label htmlFor="lookup-postcode" className="sr-only">
          Property postcode
        </label>
        <input
          id="lookup-postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Property postcode"
          autoComplete="postal-code"
          spellCheck={false}
          className={`${field} flex-1`}
        />
        <button
          type="submit"
          disabled={busy || !postcode.trim()}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-coral-deep px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy && !result ? "Looking up…" : "Look up"}
        </button>
      </form>

      {error && (
        <p role="status" className="mt-4 text-[14.5px] text-coral-light">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 rounded-panel border border-white/12 bg-white/5 p-6 max-sm:p-5">
          <p className="text-[11.5px] font-bold tracking-[0.14em] text-white/45 uppercase">
            {result.postcode}
          </p>

          <dl className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            <div>
              <dt className="text-[12.5px] text-white/45">Local authority</dt>
              <dd className="mt-1 font-display text-[17px] font-semibold tracking-[-0.02em]">
                {result.council?.slug ? (
                  <Link
                    href={`/councils/${result.council.slug}`}
                    className="underline decoration-white/25 underline-offset-4 transition hover:decoration-white"
                  >
                    {result.council.name}
                  </Link>
                ) : (
                  result.council?.name
                )}
              </dd>
            </div>
            {result.waterCompany && (
              <div>
                <dt className="text-[12.5px] text-white/45">Water and drainage</dt>
                <dd className="mt-1 font-display text-[17px] font-semibold tracking-[-0.02em]">
                  {result.waterCompany}
                </dd>
              </div>
            )}
          </dl>

          {/* Only where we have completed enough work there to say anything. No
              figure is invented for a council outside the tracker's top 20. */}
          {result.turnaround && (
            <p className="mt-5 border-t border-white/12 pt-4 text-[14.5px] leading-relaxed text-white/70">
              We have completed{" "}
              <b className="font-semibold text-white">
                {result.turnaround.completed.toLocaleString("en-GB")}
              </b>{" "}
              searches here in the last 90 days &mdash; averaging{" "}
              <b className="font-semibold text-white">
                {result.turnaround.averageWorkDays} working days
              </b>
              .
            </p>
          )}

          {!result.council?.slug && (
            <p className="mt-5 border-t border-white/12 pt-4 text-[14.5px] leading-relaxed text-white/60">
              We work across England and Wales. Send it over and we will confirm whether we cover it.
            </p>
          )}

          {sent ? (
            <p role="status" className="mt-5 border-t border-white/12 pt-5 text-[15px] text-white">
              Thank you &mdash; that is with us. You will have a price back within one working day.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-5 border-t border-white/12 pt-5">
              <p className="mb-3.5 text-[14.5px] text-white/70">
                Leave an email and we will price this property against that council&rsquo;s own fees.
              </p>
              <div className="flex gap-2.5 max-[620px]:flex-col">
                <label htmlFor="lookup-firm" className="sr-only">
                  Your firm
                </label>
                <input
                  id="lookup-firm"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  placeholder="Your firm"
                  autoComplete="organization"
                  className={`${field} flex-1`}
                />
                <label htmlFor="lookup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="lookup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className={`${field} flex-1`}
                />
                <button
                  type="submit"
                  disabled={busy || !email.trim()}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {busy ? "Sending…" : "Send"}
                </button>
              </div>
              {sendError && (
                <p role="status" className="mt-3 text-[14.5px] text-coral-light">
                  {sendError}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
