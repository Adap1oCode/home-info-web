import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="mx-auto w-full px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t border-gray-800" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="space-y-1 text-sm text-gray-400">
              <div className="font-medium text-white">Property Search Solutions Ltd</div>
              <div>Email: <a href="mailto:info@propertysearchsolutions.co.uk" className="text-blue-400 hover:text-blue-300 hover:underline">info@propertysearchsolutions.co.uk</a></div>
              <div>Phone: <a href="tel:01234567890" className="text-blue-400 hover:text-blue-300 hover:underline">01234 567890</a></div>
              <div className="mt-2 text-gray-500">Registered in England & Wales | ICO Registration No. [Your Number]</div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#services"
                >
                  Local Authority Searches
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#services"
                >
                  Environmental Searches
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#services"
                >
                  Drainage & Water
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#services"
                >
                  Title Checks
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/faqs"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/#contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 transition hover:text-white"
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
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-linear-to-b before:from-gray-600 before:to-gray-700/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Property'] after:absolute after:inset-0 after:bg-gray-500/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Property'] after:[text-shadow:0_1px_0_black]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-600 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
