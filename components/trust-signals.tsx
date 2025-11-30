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
    <section className="relative bg-gradient-to-br from-[#1a2332] via-[#2d3a4f] to-[#1e2a3a] py-16 text-white transition-all duration-700 md:py-24 overflow-hidden">
      {/* Decorative blue elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#1a2332]/80 to-[#2d3a4f]/60"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#4C96DE]/20 blur-[140px]"></div>
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4C96DE]/15 blur-[130px]"></div>
      </div>
      
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="text-center">
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
                  className="group flex items-start space-x-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:shadow-[#4C96DE]/20 hover:border-[#4C96DE]/50"
                  data-aos="zoom-y-out"
                  data-aos-delay={index * 100}
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 fill-[#4C96DE] transition-transform duration-300 group-hover:scale-110"
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
    </section>
  );
}

