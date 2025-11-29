export default function TrustSignals() {
  const signals = [
    "ICO Registered & UK GDPR Compliant",
    "Members of COPSO and IPSA",
    "Fast Turnaround Times with Clear SLAs",
    "Transparent, Fixed-Fee Pricing",
    "Trusted by Conveyancers Nationwide",
    "Personalised Support from a Dedicated Expert",
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-8 text-3xl font-bold md:text-4xl"
              data-aos="zoom-y-out"
            >
              Why Legal Professionals Choose Us
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 rounded-lg bg-gray-50 p-4 text-left"
                  data-aos="zoom-y-out"
                  data-aos-delay={index * 100}
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 fill-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

