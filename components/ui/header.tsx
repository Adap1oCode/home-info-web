"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        <div className="relative flex h-17 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center h-full overflow-hidden">
            <Logo />
          </div>

          {/* Desktop Navigation links */}
          <ul className="hidden md:flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/#services"
                className="btn-sm bg-white text-[#2D2D2D] shadow-sm hover:bg-gray-50"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/#why-us"
                className="btn-sm bg-white text-[#2D2D2D] shadow-sm hover:bg-gray-50"
              >
                Why Us
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="btn-sm bg-white text-[#2D2D2D] shadow-sm hover:bg-gray-50"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/#faqs"
                className="btn-sm bg-[#4C96DE] text-white shadow-sm hover:bg-[#4C96DE]/90"
              >
                FAQs
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4C96DE]"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!mobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-white shadow-lg border border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/#services"
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#4C96DE]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#why-us"
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#4C96DE]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link
                href="/#contact"
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#4C96DE]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/#faqs"
                className="block rounded-lg px-3 py-2 text-base font-medium bg-[#4C96DE] text-white hover:bg-[#4C96DE]/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
