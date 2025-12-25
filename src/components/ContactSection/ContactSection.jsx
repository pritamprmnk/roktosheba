import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg">
              Have questions about eligibility or the donation process? 
              Our team is here to help you every step of the way.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Phone</p>
                <p className="text-gray-600">+9644 4444444</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">support@roktosheba.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Location</p>
                <p className="text-gray-600">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF8F8] p-8 rounded-2xl border border-red-50 shadow-sm">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
              <textarea 
                rows="4" 
                placeholder="How can we help you?" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#CC1B36] hover:bg-[#b0172e] text-white font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;