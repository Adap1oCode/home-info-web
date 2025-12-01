import Accordion from "@/components/accordion";

const faqs = [
  {
    title: "Who are your services for?",
    content:
      "Our property search services are tailored for conveyancers, solicitors, and legal professionals across England and Wales.",
  },
  {
    title: "What types of searches do you offer?",
    content:
      "We provide Local Authority, Environmental, Drainage & Water, Title checks, and bespoke search packages.",
  },
  {
    title: "How do I request a search?",
    content:
      "Use our contact form or email us directly at info@homeinformationsearches.co.uk.",
  },
  {
    title: "What is your turnaround time?",
    content:
      "Most searches are completed within 3–5 working days, depending on the local authority and search type.",
  },
  {
    title: "Is my data secure?",
    content:
      "Yes. We are ICO registered and comply with UK GDPR. Your data is never shared with third parties.",
  },
];

export default function FAQsSection() {
  return (
    <section id="faqs" className="relative overflow-hidden bg-gradient-to-br from-[#FDFDFF] via-white to-[#4C96DE]/5 py-16 transition-all duration-700 md:py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#4C96DE]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#4C96DE]/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#4C96DE]/10 blur-3xl" />
      
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        <div>
          <h2 className="mb-12 text-center text-4xl font-bold text-[#2D2D2D]">
            Frequently Asked Questions
          </h2>
          
          <div className="mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                id={`faq-${index}`}
                title={faq.title}
                active={index === 0}
              >
                {faq.content}
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

