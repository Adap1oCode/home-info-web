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
    <section className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 py-16 text-white transition-all duration-700 md:py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-8 text-3xl font-bold text-white md:text-4xl"
              data-aos="zoom-y-out"
            >
              Why Legal Professionals Choose Us
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {signals.map((signal, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:border-blue-400/50"
                  data-aos="zoom-y-out"
                  data-aos-delay={index * 100}
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 fill-blue-400 transition-transform duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

