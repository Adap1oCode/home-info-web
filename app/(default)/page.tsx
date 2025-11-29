export const metadata = {
  title: "Property Search Solutions - Specialist Property Searches for Legal Professionals",
  description: "Fast, accurate, and fully compliant property searches delivered nationwide—trusted by conveyancers and solicitors across England and Wales.",
};

import Hero from "@/components/hero-home";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TrustSignals from "@/components/trust-signals";
import ContactForm from "@/components/contact-form";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TrustSignals />
      <ContactForm />
    </>
  );
}
