export const metadata = {
  title: "Terms of Use - Property Search Solutions",
  description: "Terms of Use for Property Search Solutions Ltd",
};

export default function TermsOfUse() {
  return (
    <div className="mx-auto w-full px-4 py-20 sm:px-6">
      <h1 className="mb-8 text-4xl font-bold">Terms of Use</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700">
          By using this website, you agree to the following terms:
        </p>

        <h2 className="mt-8 text-2xl font-bold">Services</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>We provide property search services for legal professionals</li>
          <li>All information is provided in good faith and based on available data</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Use of Site</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>You must not misuse the site or attempt to access restricted areas</li>
          <li>Content may not be copied or redistributed without permission</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Liability</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>We are not liable for delays or errors caused by third-party data providers</li>
          <li>Our reports are advisory and should be used alongside legal due diligence</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Changes</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Terms may be updated periodically</li>
          <li>Continued use of the site implies acceptance of changes</li>
        </ul>
      </div>
    </div>
  );
}

