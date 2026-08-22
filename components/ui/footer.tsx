import Link from "next/link";

import { company, contact, footerNav, legalNav, phoneHref } from "@/config/site";
import Logo from "./logo";
import { ConfigValue, Unconfirmed } from "./unconfirmed";

export default function Footer() {
  return (
    <footer className="pt-10 pb-13 text-[14.5px] text-tx-mid">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr_1fr] gap-11 pt-12 pb-13 max-lg:grid-cols-3 max-[620px]:grid-cols-2">
          <div className="max-[620px]:col-span-full">
            <Logo />
            <p className="mt-4 mb-5 max-w-[27em] leading-relaxed">
              An independent property search agent, working with conveyancers and solicitors across{" "}
              {company.coverage}.
            </p>
            <a
              href={phoneHref}
              className="mb-1 block font-display text-[22px] font-bold tracking-[-0.03em] text-tx hover:text-brand-dark"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>
            <a href={`mailto:${contact.email}`} className="hover:text-brand-dark">
              {contact.email}
            </a>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-tx-low">
                {col.heading}
              </h4>
              <ul className="list-none space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-brand-dark">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5 border-t border-mist pt-6 text-[12.5px] text-tx-low">
          <span>
            &copy; {new Date().getFullYear()} {company.legalName}. Registered in {company.registeredIn}{" "}
            no. <ConfigValue field={company.companyNumber} />.
          </span>
          <span className="ml-auto flex flex-wrap gap-5">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-brand-dark">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
