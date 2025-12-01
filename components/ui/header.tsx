import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navigation links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
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
        </div>
      </div>
    </header>
  );
}
