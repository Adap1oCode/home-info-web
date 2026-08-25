/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * /faqs and /testimonials were pages; they are homepage anchors now.
   *
   * Permanent, not temporary: the old site has served /faqs for years, so it
   * is the one path here with links and search history pointing at it. A 404
   * would throw that away; a 301 passes it to the homepage.
   *
   * Next preserves the fragment on a redirect, so /faqs lands on the section
   * rather than the top of the page.
   */
  async redirects() {
    return [
      { source: "/faqs", destination: "/#faqs", permanent: true },
      { source: "/testimonials", destination: "/#testimonials", permanent: true },
    ];
  },
};

module.exports = nextConfig;
