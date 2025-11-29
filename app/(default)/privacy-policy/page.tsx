export const metadata = {
  title: "Privacy Policy - Property Search Solutions",
  description: "Privacy Policy for Property Search Solutions Ltd",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto w-full px-4 py-20 sm:px-6">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700">
          Home Information Searches (HIS) Ltd is committed to protecting your privacy. This policy
          outlines how we collect, use, and safeguard your personal data.
        </p>

        <h2 className="mt-8 text-2xl font-bold">What We Collect</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Contact details (name, firm, email, phone)</li>
          <li>Search request information</li>
          <li>Website usage data (via cookies)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">How We Use Your Data</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>To process property search requests</li>
          <li>To respond to enquiries</li>
          <li>To improve our services</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Data Protection</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>We are registered with the ICO (Information Commissioner's Office)</li>
          <li>We comply with UK GDPR regulations</li>
          <li>Data is stored securely and not shared with third parties</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Your Rights</h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Access, correct, or delete your data</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <p className="mt-8 text-lg text-gray-700">
          For full details, please contact:{" "}
          <a
            href="mailto:info@homeinformationsearches.co.uk"
            className="text-blue-600 hover:underline"
          >
            info@homeinformationsearches.co.uk
          </a>
        </p>
      </div>
    </div>
  );
}

