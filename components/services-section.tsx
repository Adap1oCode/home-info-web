export default function ServicesSection() {
  const services = [
    {
      title: "Local Authority Searches",
      description: "Planning, building control, highways, and enforcement notices",
      icon: (
        <svg
          className="fill-[#4C96DE]"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
        >
          <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm1 10a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" />
        </svg>
      ),
    },
    {
      title: "Environmental Searches",
      description: "Flood risk, contaminated land, ground stability, and radon data",
      icon: (
        <svg
          className="fill-[#4C96DE]"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
        >
          <path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9ZM1 14a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H1Z" />
        </svg>
      ),
    },
    {
      title: "Drainage & Water Searches",
      description: "Sewer connections, water supply, and billing arrangements",
      icon: (
        <svg
          className="fill-[#4C96DE]"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
        >
          <path
            d="M2.248 6.285a1 1 0 0 1-1.916-.57A8.014 8.014 0 0 1 5.715.332a1 1 0 0 1 .57 1.916 6.014 6.014 0 0 0-4.037 4.037Z"
            opacity=".3"
          />
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.715-6.752a1 1 0 0 1 .57-1.916 8.014 8.014 0 0 1 5.383 5.383 1 1 0 1 1-1.916.57 6.014 6.014 0 0 0-4.037-4.037Zm4.037 7.467a1 1 0 1 1 1.916.57 8.014 8.014 0 0 1-5.383 5.383 1 1 0 1 1-.57-1.916 6.014 6.014 0 0 0 4.037-4.037Zm-7.467 4.037a1 1 0 1 1-.57 1.916 8.014 8.014 0 0 1-5.383-5.383 1 1 0 1 1 1.916-.57 6.014 6.014 0 0 0 4.037 4.037Z" />
        </svg>
      ),
    },
    {
      title: "Title Checks",
      description: "Ownership, boundaries, easements, and restrictive covenants",
      icon: (
        <svg
          className="fill-[#4C96DE]"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
        >
          <path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm6 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 1 1 0 2h-1a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h1a1 1 0 1 1 0 2h-1ZM1 1a1 1 0 0 0 0 2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H1Z" />
        </svg>
      ),
    },
    {
      title: "Bespoke Search Packages",
      description: "Customised bundles to meet your firm's specific requirements",
      icon: (
        <svg
          className="fill-[#4C96DE]"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
        >
          <path d="M10.284.33a1 1 0 1 0-.574 1.917 6.049 6.049 0 0 1 2.417 1.395A1 1 0 0 0 13.5 2.188 8.034 8.034 0 0 0 10.284.33ZM6.288 2.248A1 1 0 0 0 5.718.33 8.036 8.036 0 0 0 2.5 2.187a1 1 0 0 0 1.372 1.455 6.036 6.036 0 0 1 2.415-1.395ZM1.42 5.401a1 1 0 0 1 .742 1.204 6.025 6.025 0 0 0 0 2.79 1 1 0 0 1-1.946.462 8.026 8.026 0 0 1 0-3.714A1 1 0 0 1 1.421 5.4Zm2.452 6.957A1 1 0 0 0 2.5 13.812a8.036 8.036 0 0 0 3.216 1.857 1 1 0 0 0 .574-1.916 6.044 6.044 0 0 1-2.417-1.395Zm9.668.04a1 1 0 0 1-.041 1.414 8.033 8.033 0 0 1-3.217 1.857 1 1 0 1 1-.571-1.917 6.035 6.035 0 0 0 2.415-1.395 1 1 0 0 1 1.414.042Zm2.242-6.255a1 1 0 1 0-1.946.462 6.03 6.03 0 0 1 0 2.79 1 1 0 1 0 1.946.462 8.022 8.022 0 0 0 0-3.714Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-50/30 to-[#4C96DE]/15 py-16 transition-all duration-700 md:py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#4C96DE]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#4C96DE]/20 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#4C96DE]/20 blur-3xl" />
      
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        <div>
          {/* Section header */}
          <div className="pb-16 text-center md:pb-20">
            <h2
              className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
              data-aos="zoom-y-out"
            >
              Our Search Services
            </h2>
            <p
              className="text-lg text-gray-700"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              We offer a full suite of regulated property searches to support your conveyancing process:
            </p>
          </div>
          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={index}
                className="group relative rounded-xl bg-white p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#4C96DE]"
                data-aos="zoom-y-out"
                data-aos-delay={index * 100}
              >
                <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 group-hover:text-[#4C96DE] transition-colors duration-300">
                  <span className="transition-transform duration-300 group-hover:scale-110">{service.icon}</span>
                  <span>{service.title}</span>
                </h3>
                <p className="text-[15px] text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

