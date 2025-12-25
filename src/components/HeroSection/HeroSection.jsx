import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[#fdf8f6] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Be the Reason for <br /> Someone&apos;s <span className="text-red-600">Heartbeat</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Your blood donation can save up to three lives. Join our
            community of heroes today and make a direct impact on those
            in critical need.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Join as a Donor
            </Link>

            <Link
              to="/searchrequest"
              className="border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
            >
              Search Donors
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src="/assets/herobanner.jpg"
              alt="Blood Donation"
              className="w-full max-w-md object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
