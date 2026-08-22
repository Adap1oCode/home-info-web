import type { ReactNode } from "react";

/**
 * Renders a value from config/site.ts, visibly marking it while it is still
 * unconfirmed.
 *
 * The marker is OPT-IN. It used to show automatically in development, which
 * meant the homepage was permanently striped with red dashed underlines —
 * across the accreditation names, the logos row and the phone number in the
 * header — and that made the design impossible to judge. Set
 * NEXT_PUBLIC_ALLOW_UNCONFIRMED=1 in .env.local when you want to audit what is
 * still outstanding.
 *
 * Turning the markers off does NOT weaken the guarantee. The real gate is
 * `npm run check:config`, which still refuses a production build while any
 * `confirmed: false` remains in config/site.ts and lists each one with its
 * note. Nothing unverified can reach production whether the markers render or
 * not — so confirm the values in config, do not reach for this flag.
 */
export const markersVisible = process.env.NEXT_PUBLIC_ALLOW_UNCONFIRMED === "1";

export function Unconfirmed({
  when,
  children,
  title,
}: {
  /** Pass the config entry's `confirmed` flag. */
  when: boolean;
  children: ReactNode;
  /** Optional tooltip — usually the config entry's `note`. */
  title?: string;
}) {
  if (when || !markersVisible) return <>{children}</>;
  return (
    <span
      className="unconfirmed-inline"
      title={title ? `Unconfirmed — ${title}` : "Unconfirmed value"}
    >
      {children}
    </span>
  );
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
  return (
    <Unconfirmed when={field.confirmed} title={field.note}>
      {format ? format(field.value) : field.value}
    </Unconfirmed>
  );
}
