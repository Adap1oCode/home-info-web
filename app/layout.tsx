import "./css/style.css";

import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { seo } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
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
        className={`${inter.variable} ${interTight.variable} bg-chalk font-sans text-tx antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen w-full flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
