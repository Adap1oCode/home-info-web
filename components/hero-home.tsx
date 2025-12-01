import Image from "next/image";
import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFDFF] via-white to-[#4C96DE]/5 transition-all duration-700">
      <PageIllustration />
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#4C96DE]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#4C96DE]/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#4C96DE]/10 blur-3xl" />
      
      <div className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mx-auto">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left" data-aos="fade-right">
              {/* Badge */}
              <div 
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4C96DE]/10 px-3 py-1.5 text-xs font-semibold text-[#4C96DE] shadow-sm"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4C96DE] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4C96DE]"></span>
                </span>
                Trusted by Legal Professionals Nationwide
              </div>

              {/* Main Heading */}
              <h1
                className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
                data-aos="fade-up"
                data-aos-delay={150}
              >
                Specialist Property Searches for{" "}
                <span className="bg-gradient-to-r from-[#4C96DE] to-[#4C96DE] bg-clip-text text-transparent">
                  Legal Professionals
                </span>
              </h1>

              {/* Description */}
              <div className="lg:mx-0">
                <p
                  className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  Fast, accurate, and fully compliant property searches delivered nationwide—trusted by
                  conveyancers and solicitors across England and Wales.
                </p>

                {/* CTA Buttons */}
                <div
                  className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay={450}
                >
                  <a
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#4C96DE] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4C96DE]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4C96DE]/60"
                    href="#contact"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Request a Search
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-[#4C96DE] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                  <a
                    className="group inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-[#4C96DE] hover:bg-[#4C96DE]/10 hover:text-[#4C96DE]"
                    href="#services"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div 
              className="relative order-first lg:order-last"
              data-aos="fade-left"
              data-aos-delay={300}
            >
              <div className="relative w-full mx-auto">
                {/* Image Container with Decorative Elements */}
                <div className="relative">
                  {/* Decorative gradient circles */}
                  <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-[#4C96DE]/30 blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-[#4C96DE]/30 blur-3xl" />
                  
                  {/* Main Image Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C96DE]/10 to-[#4C96DE]/5 shadow-2xl shadow-[#4C96DE]/20">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src="/images/61cfebab-5753-4e74-89b8-7fd6f0990ed2.png"
                        alt="Specialist Property Searches for Legal Professionals"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    
                    {/* Floating badge on image */}
                    <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4C96DE]/10">
                          <svg
                            className="h-6 w-6 text-[#4C96DE]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Verified & Certified</div>
                          <div className="text-xs text-gray-600">Fully compliant searches</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Boxes */}
                {/* Box 1: 100% Compliant */}
                <div 
                  className="absolute -left-4 top-1/4 hidden animate-float lg:block rounded-lg bg-white p-4 shadow-xl border border-gray-100"
                  data-aos="fade-right"
                  data-aos-delay={400}
                  style={{ animationDuration: '3s' }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4C96DE]">100%</div>
                    <div className="text-xs text-gray-600 mt-1">Compliant</div>
                  </div>
                </div>

                {/* Box 2: 24/7 Support */}
                <div 
                  className="absolute -right-4 top-1/2 hidden animate-float lg:block rounded-lg bg-white p-4 shadow-xl border border-gray-100"
                  data-aos="fade-left"
                  data-aos-delay={500}
                  style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4C96DE]">24/7</div>
                    <div className="text-xs text-gray-600 mt-1">Support</div>
                  </div>
                </div>

                {/* Box 3: Fast Delivery */}
                <div 
                  className="absolute left-1/2 -bottom-4 -translate-x-1/2 hidden animate-float lg:block rounded-lg bg-white p-4 shadow-xl border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay={600}
                  style={{ animationDuration: '4s', animationDelay: '1s' }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4C96DE]">Fast</div>
                    <div className="text-xs text-gray-600 mt-1">Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
