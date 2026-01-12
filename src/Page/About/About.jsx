import React from "react";

const About = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          About
        </h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded"></div>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          RoktoSheba is a modern blood donation platform built with the MERN
          stack (MongoDB, Express.js, React, Node.js) to connect blood donors and
          recipients in a fast, simple, and reliable way.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our goal is to make blood donation easier and more organized by using
          technology. Through RoktoSheba, users can find nearby donors based on
          blood group, district, and upazila, and request blood when it is
          urgently needed.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          The platform includes role-based dashboards for donors, volunteers,
          and admins. Donors can manage their profiles and donation requests,
          volunteers help update donation statuses, and admins manage users and
          the entire system.
        </p>

        {/* Highlight Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
          <p className="text-red-700 text-lg font-medium">
            RoktoSheba is not just an app — it’s a social responsibility platform
            that helps save lives by connecting people who want to help with
            people who need help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
