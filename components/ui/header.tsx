"use client";

import Link from "next/link";
import { useState } from "react";

import { contact, nav, phoneHref } from "@/config/site";
import Logo from "./logo";
import { Unconfirmed } from "./unconfirmed";

/**
 * Flat full-width bar. Deliberately not a floating pill — the hero below it is
 * a full-bleed banner, and two competing rounded shapes at the top of the page
 * read as a mistake.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex h-[78px] max-w-[1240px] items-center gap-7 px-8 max-sm:h-[68px] max-sm:px-[18px]">
        <Logo />

        {/* Collapses to the burger at 1240px, not 1120px.
            Six items need 1121px of content box; with this container's px-8 that
            is 1185px of bar, which is what a 1200px viewport leaves once Windows
            takes 15px for the scrollbar — an exact fit and no more. The nav now
            appears only once the container reaches its own max-width, where there
            is ~40px spare for a longer label or a wider font render.

            Note `flex-1` does not grow this list: the sibling below carries
            `ml-auto`, and auto margins absorb free space before flex-grow is
            applied, so the row is packed and the 28px beside "FAQs" is the flex
            gap rather than slack. Change this breakpoint with the two values
            below; all three describe one boundary. */}
        <ul className="flex flex-1 list-none gap-6 max-[1240px]:hidden">
          {nav.primary.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[14.5px] font-medium text-tx-mid transition-colors hover:text-brand-dark"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4">
          {/*
            Filled pill with the icon in its own white roundel, which also
            echoes the three roundels in the logo. Blue here and coral on the
            action beside it: two solid pills that read as a pair rather than
            as two competing buttons, and the warm one is the one we want
            pressed.
          */}
          <a
            href={phoneHref}
            className="hidden h-12 shrink-0 items-center gap-2.5 rounded-full bg-brand pr-5 pl-2 transition hover:bg-brand-dark min-[560px]:inline-flex"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
            </span>
            <span className="sr-only">Call us on </span>
            <span className="font-display text-[16px] font-semibold tracking-[-0.015em] whitespace-nowrap text-white">
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </span>
          </a>

          <Link
            href={nav.primaryCta.href}
            className="inline-flex h-12 shrink-0 items-center rounded-xl bg-coral-deep px-6 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-coral-ink max-md:hidden"
          >
            {nav.primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="hidden rounded-lg p-2 text-tx transition hover:bg-sky max-[1240px]:inline-flex"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-mist bg-white px-6 py-4 min-[1241px]:hidden">
          <ul className="list-none space-y-1">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-tx-mid hover:bg-sky hover:text-brand-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={nav.primaryCta.href}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-coral-deep px-5 py-3 text-center text-[15px] font-semibold text-white"
              >
                {nav.primaryCta.label}
              </Link>
            </li>
            {/* The header phone hides under 560px, so it has to reappear here. */}
            <li className="pt-2 min-[560px]:hidden">
              <a
                href={phoneHref}
                className="block rounded-full bg-brand px-5 py-3 text-center font-display text-[15px] font-semibold text-white"
              >
                Call{" "}
                <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                  {contact.phone.display}
                </Unconfirmed>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
