import React from "react";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-red-600 mb-4 flex justify-center items-center gap-2">
           Contact
        </h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded"></div>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg mb-8">
          Have questions, suggestions, or need help? We’re here for you.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Email */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-600 mb-2 flex items-center gap-2 justify-center">
              <FaEnvelope /> Email
            </h3>
            <p className="text-gray-700">support@roktosheba.com</p>
          </div>

          {/* Website */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-600 mb-2 flex items-center gap-2 justify-center">
              <FaGlobe /> Website
            </h3>
            <a
              href="https://roktosheba11.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 hover:text-red-600 underline"
            >
              roktosheba11.netlify.app
            </a>
          </div>
        </div>

        {/* Message */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
          <p className="text-red-700 text-lg font-medium">
            You can also use the contact form on our website to send us your
            message. Our support team will reply as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
