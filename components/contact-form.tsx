"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    firmName: "",
    email: "",
    phone: "",
    searchType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your request has been sent successfully. We'll get back to you within one business day.",
        });
        // Reset form
        setFormData({
          name: "",
          firmName: "",
          email: "",
          phone: "",
          searchType: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send your request. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-[#1a2332] via-[#2d3a4f] to-[#1e2a3a] py-16 transition-all duration-700 md:py-24 overflow-hidden">
      {/* Decorative blue elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#1a2332]/80 to-[#2d3a4f]/60"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#4C96DE]/20 blur-[140px]"></div>
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4C96DE]/15 blur-[130px]"></div>
      </div>
      
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="mx-auto">
            <div className="mb-8 text-center">
              <h2
                className="mb-4 text-3xl font-bold text-white md:text-4xl"
                data-aos="zoom-y-out"
              >
                Request a Search or Get in Touch
              </h2>
              <p
                className="text-lg text-gray-300"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                Use the form below to request a property search or ask a question. We typically respond
                within one business day.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl bg-white/10 backdrop-blur-sm border border-[#4C96DE]/30 p-6 shadow-lg shadow-[#4C96DE]/10 md:p-8 relative"
              data-aos="zoom-y-out"
              data-aos-delay={300}
            >
              {/* Blue accent glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4C96DE]/20 to-transparent rounded-xl blur opacity-50 -z-10"></div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="firmName"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Firm Name *
                  </label>
                  <input
                    type="text"
                    id="firmName"
                    name="firmName"
                    required
                    value={formData.firmName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="searchType"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Search Type *
                </label>
                <select
                  id="searchType"
                  name="searchType"
                  required
                  value={formData.searchType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-white/10 text-white px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all [&>option]:bg-[#2D2D2D] [&>option]:text-white"
                >
                  <option value="">Select a search type</option>
                  <option value="local-authority">Local Authority</option>
                  <option value="environmental">Environmental</option>
                  <option value="drainage-water">Drainage & Water</option>
                  <option value="title">Title</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-gray-400 px-4 py-2 focus:border-[#4C96DE] focus:outline-none focus:ring-2 focus:ring-[#4C96DE]/30 focus:bg-white/15 transition-all"
                />
              </div>
              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`rounded-lg p-4 ${
                    submitStatus.type === "success"
                      ? "bg-[#4C96DE]/20 text-white border border-[#4C96DE]/50"
                      : "bg-red-500/20 text-white border border-red-500/50"
                  }`}
                >
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn group w-full bg-[#4C96DE] text-white shadow-lg shadow-[#4C96DE]/30 hover:bg-[#4C96DE]/90 hover:shadow-xl hover:shadow-[#4C96DE]/40 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto transition-all"
                >
                  <span className="relative inline-flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Request{" "}
                        <span className="ml-1 tracking-normal text-white/80 transition-transform group-hover:translate-x-0.5">
                          -&gt;
                        </span>
                      </>
                    )}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-300">
                Your information is handled securely and will never be shared. View our{" "}
                <a href="/privacy-policy" className="text-[#4C96DE] hover:text-[#4C96DE]/80 hover:underline transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
        </div>
      </div>
    </section>
  );
}

