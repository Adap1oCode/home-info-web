import "./css/style.css";

import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import { isUnverifiedBuild, seo } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Sora is the display face, site-wide.
 *
 * It was already loaded by the tracker page alone, which meant the site's
 * headline page was set in a typeface that appeared nowhere else — and pulled
 * a third font family down on top of Inter and Inter Tight. Promoting it here
 * makes the tracker the rule rather than the exception, and Inter Tight drops
 * out entirely rather than being a second display face nobody sees.
 *
 * Body copy stays Inter: Sora is a geometric display face and gets tiring at
 * paragraph sizes, which is exactly how the tracker was already using it.
 */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: "Home Information Searches",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
  },
  icons: { icon: "/images/title.png" },
  /* Belt and braces with robots.ts: robots.txt is advisory, a meta tag is not,
     and a staging URL gets shared around long before anyone remembers either. */
  ...(isUnverifiedBuild ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} bg-chalk font-sans text-tx antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen w-full flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
