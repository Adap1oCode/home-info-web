import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

/**
 * Server component. AOS has been removed — the old scroll-fade on every element
 * was a template default, and it fought the new design's own transitions.
 */
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
