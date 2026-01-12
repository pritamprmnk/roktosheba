import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last Updated: January 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="leading-relaxed">
          To provide a seamless blood donation experience, **RoktoSheba** collects personal information including your 
          name, email address, blood group, profile picture, and location (District and Upazila). We also collect 
          phone numbers to allow direct communication between donors and recipients.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>To display your profile in search results for blood seekers.</li>
          <li>To facilitate communication for emergency blood requests.</li>
          <li>To verify user roles (Donor, Volunteer, Admin) via JWT authentication.</li>
          <li>To process voluntary donations through our secure Stripe payment gateway.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
        <p className="leading-relaxed">
          We implement industry-standard security protocols. Your passwords are encrypted, and private routes 
          are protected. While we strive to protect your personal information, no method of transmission 
          over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
        <p className="leading-relaxed">
          We use **Stripe** for financial transactions. We do not store your credit card information on our servers; 
          all payment data is handled securely by Stripe's infrastructure.
        </p>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-200">
        <p>If you have questions about this policy, contact us at: <span className="text-red-600 font-medium">support@roktosheba.com</span></p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;