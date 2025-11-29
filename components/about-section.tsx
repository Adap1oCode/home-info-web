export default function AboutSection() {
  return (
    <section id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="mb-6 text-3xl font-bold md:text-4xl"
              data-aos="zoom-y-out"
            >
              Your Trusted Partner in Property Search Services
            </h2>
            <p
              className="text-lg text-gray-700"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              We specialise in delivering comprehensive property search reports tailored to the needs of
              legal professionals. With a deep understanding of conveyancing requirements and
              regulatory compliance, we ensure every search is accurate, timely, and aligned with your
              case deadlines. Whether you're handling residential or commercial transactions, we provide
              the clarity and confidence you need to move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

