import type { ReactNode } from "react";

/**
 * Renders a value from config/site.ts.
 *
 * ── The markers are gone ────────────────────────────────────────────────────
 * These components used to wrap unconfirmed values in a red dashed underline
 * whenever NEXT_PUBLIC_ALLOW_UNCONFIRMED=1. That flag is also what lets a
 * build pass `check:config`, so the moment the site went live on the real
 * domain it painted red underlines through the header phone number and every
 * accreditation on the page — PCCB, Search Code, the Property Ombudsman, ICO.
 * To a visitor it read as a rendering fault, not as an editorial flag.
 *
 * The marker never protected anyone anyway: an unverified claim is published
 * whether or not it has a line under it. The things that actually hold the
 * line are unchanged:
 *
 *   - `npm run check:config` still refuses a production build while any
 *     `confirmed: false` remains, and prints each one with its note.
 *   - `isUnverifiedBuild` in config/site.ts still forces noindex + a
 *     robots.txt "Disallow: /" on any build using the override.
 *
 * So the fix for an unconfirmed value is to confirm it in config, not to look
 * at a underline. These wrappers are kept as pass-throughs so the ~15 call
 * sites keep reading as "this value comes from config" — deleting them would
 * be a large diff that removes that signal for no gain.
 */

export function Unconfirmed({ children }: { when: boolean; children: ReactNode; title?: string }) {
  return <>{children}</>;
}

/**
 * Convenience for the common `{ value, confirmed, note }` shape.
 *
 *   <ConfigValue field={company.companyNumber} />
 */
export function ConfigValue({
  field,
  format,
}: {
  field: { value: string | number; confirmed: boolean; note?: string };
  format?: (v: string | number) => ReactNode;
}) {
  return <>{format ? format(field.value) : field.value}</>;
}
