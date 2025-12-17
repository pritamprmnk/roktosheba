import React from 'react';
import { Link } from 'react-router';
const Forgot = () => {
    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5v-6.75A2.25 2.25 0 016.75 10.5z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 ">
          Forgot Your Password?
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link <br /> to reset
          your password.
        </p>

        {/* Form */}
        <form  className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-teal-400 text-gray-800"
              
              
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-gray-600 hover:text-red-600 flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Forgot;