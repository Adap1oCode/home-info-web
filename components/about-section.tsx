export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white py-16 transition-all duration-700 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-100/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl"></div>
      </div>
      
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="mb-6 flex justify-center" data-aos="zoom-y-out">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by Legal Professionals
              </span>
            </div>
            
            <div className="text-center">
              <h2
                className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
                data-aos="zoom-y-out"
                data-aos-delay={100}
              >
                Your Trusted Partner in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Property Search Services
                </span>
              </h2>
              <p
                className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl"
                data-aos="zoom-y-out"
                data-aos-delay={200}
              >
                We specialise in delivering comprehensive property search reports tailored to the needs of
                legal professionals. With a deep understanding of conveyancing requirements and
                regulatory compliance, we ensure every search is accurate, timely, and aligned with your
                case deadlines.
              </p>
              
              {/* Feature highlights */}
              <div className="grid gap-6 sm:grid-cols-3" data-aos="zoom-y-out" data-aos-delay={300}>
                <div className="rounded-xl bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">100% Accurate</h3>
                  <p className="text-sm text-gray-600">Precise, verified property data</p>
                </div>
                
                <div className="rounded-xl bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Fast Turnaround</h3>
                  <p className="text-sm text-gray-600">Quick delivery, clear SLAs</p>
                </div>
                
                <div className="rounded-xl bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">Fully Compliant</h3>
                  <p className="text-sm text-gray-600">GDPR & regulatory compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

