import Accordion from "@/components/accordion";

export const metadata = {
  title: "FAQs - Home Information Searches Ltd -",
  description: "Frequently Asked Questions about Property Search Solutions",
};

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

export default function FAQs() {
  return (
    <div className="mx-auto w-full px-4 py-20 sm:px-6">
      <h1 className="mb-12 text-center text-4xl font-bold">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
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
  );
}

