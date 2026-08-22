import Link from "next/link";

import { contact, nav, phoneHref } from "@/config/site";
import { Unconfirmed } from "@/components/ui/unconfirmed";

/** The closer, and the second of only two dark sections on the page. */
export default function Cta() {
  return (
    <section className="section-y relative mx-8 mb-8 overflow-hidden rounded-hero bg-ink text-white max-lg:mx-3.5 max-lg:mb-3.5">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-115 left-1/2 h-205 w-205 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgb(52 140 220 / 0.42), transparent 62%)" }}
      />
      <div className="relative mx-auto max-w-[1240px] px-17 max-lg:px-6">
        <div className="grid grid-cols-[1.3fr_0.7fr] items-center gap-17 max-[900px]:grid-cols-1 max-[900px]:gap-11">
          <div>
            {/* Was "Open an account", matching a CTA that pointed at a page which
                did not exist. The first step is a quote, so the copy says so. */}
            <span className="eyebrow bg-white/10 text-white">Getting started</span>
            <h2 className="mt-6.5 mb-5.5 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              Start with one property.
            </h2>
            <p className="max-w-[40em] text-[19px] leading-relaxed text-white/65">
              There is no minimum volume, no integration project and no account to set up first.
              Tell us the property and which reports you need, and we will price it against that
              council&rsquo;s own fees.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={nav.primaryCta.href}
                className="inline-flex items-center gap-2.5 rounded-xl bg-coral-deep px-7 py-4 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral"
              >
                {nav.primaryCta.label} <span aria-hidden>&rarr;</span>
              </Link>
              {/* /contact does not exist; email does and is answered. */}
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center rounded-full border-[1.5px] border-white/30 px-7 py-4 text-[15px] font-semibold transition hover:border-white hover:bg-white/8"
              >
                Email us a test search
              </a>
            </div>
          </div>

          <div>
            <span className="eyebrow bg-coral/18 text-coral">Or just call</span>
            <a
              href={phoneHref}
              className="mt-5 block font-display text-[42px] leading-none font-bold tracking-[-0.05em] text-white hover:text-brand-light"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>
            <p className="mt-3.5 text-[14.5px] text-white/55">
              <Unconfirmed when={contact.hours.confirmed} title={contact.hours.note}>
                {contact.hours.days}, {contact.hours.from}&ndash;{contact.hours.to}.
              </Unconfirmed>{" "}
              Answered by {contact.answeredBy.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
