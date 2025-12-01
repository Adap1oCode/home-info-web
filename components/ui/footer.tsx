import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="bg-[#FDFDFF] text-[#2D2D2D]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t border-gray-200" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-6">
            <div className="mb-4">
              <Logo size="large" />
            </div>
            <div className="space-y-1 text-sm text-[#2D2D2D]/80">
              <div className="font-medium text-[#2D2D2D]">Home Information Searches (HIS) Ltd</div>
              <div>Email: <a href="mailto:info@propertysearchsolutions.co.uk" className="text-[#4C96DE] hover:text-[#4C96DE]/80 hover:underline">info@homeinformationsearches.co.uk</a></div>
              <div>Phone: <a href="tel:01234567890" className="text-[#4C96DE] hover:text-[#4C96DE]/80 hover:underline">07702 316 899</a></div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
            <h3 className="text-sm font-medium text-[#2D2D2D]">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#services"
                >
                  Local Authority Searches
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#services"
                >
                  Environmental Searches
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#services"
                >
                  Drainage & Water
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#services"
                >
                  Title Checks
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
            <h3 className="text-sm font-medium text-[#2D2D2D]">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#faqs"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/#contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
            <h3 className="text-sm font-medium text-[#2D2D2D]">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-[#2D2D2D]/80 transition hover:text-[#4C96DE]"
                  href="/terms-of-use"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-8 h-10 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[200px] font-bold leading-none before:bg-linear-to-b before:from-[#2D2D2D]/20 before:to-[#2D2D2D]/10 before:to-80% before:bg-clip-text before:text-transparent before:content-['Property'] after:absolute after:inset-0 after:bg-[#2D2D2D]/30 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Property'] after:[text-shadow:0_1px_0_#2D2D2D]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-40 w-40 rounded-full border-[20px] border-[#4C96DE] blur-[60px]"></div>
        </div>
      </div>
    </footer>
  );
}
