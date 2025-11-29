"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize AOS after component has mounted to avoid hydration issues
    if (typeof window !== "undefined") {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 700,
        easing: "ease-out-cubic",
        startEvent: "DOMContentLoaded",
        useClassNames: false,
        disableMutationObserver: false,
      });
      
      // Refresh AOS after a short delay to ensure all elements are processed
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <>
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
