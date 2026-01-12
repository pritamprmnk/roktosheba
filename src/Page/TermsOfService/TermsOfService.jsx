import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Terms of Service</h1>
      <p className="mb-4 text-sm text-gray-500">Effective Date: January 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="leading-relaxed">
          By registering an account on **RoktoSheba**, you agree to abide by our rules and regulations. 
          If you do not agree, please do not use the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. User Responsibilities</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>You must provide accurate medical and contact information.</li>
          <li>**Commercialization of blood is strictly prohibited.** This platform is for voluntary service only.</li>
          <li>Users must not create fake blood donation requests or harass other users.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Medical Disclaimer</h2>
        <p className="leading-relaxed bg-red-50 p-4 border-l-4 border-red-500">
          **Important:** RoktoSheba is a matching platform, not a medical provider. It is the sole responsibility 
          of the recipient to verify the donor's health status and ensure blood compatibility at a certified 
          medical facility before transfusion.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Account Termination</h2>
        <p className="leading-relaxed">
          Administrators reserve the right to block or delete accounts that violate our community standards, 
          provide false information, or engage in suspicious activity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Donations & Funding</h2>
        <p className="leading-relaxed">
          Payments made via the "Funding" section are voluntary contributions. These are non-refundable 
          and are used to maintain the platform's servers and operations.
        </p>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center italic text-gray-600">
        "Save a life, donate blood."
      </footer>
    </div>
  );
};

export default TermsOfService;