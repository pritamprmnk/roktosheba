import React from 'react';

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // এখানে আপনার ব্যাকএন্ড বা ফায়ারবেস লজিক যোগ করতে পারেন
    alert("Thank you for subscribing to RoktoSheba!");
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto bg-red-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
        
        {/* Left Side: Content */}
        <div className="p-8 md:p-12 md:w-1/2 text-white text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Stay Connected, <br /> Save Lives.
          </h2>
          <p className="text-red-100 mb-6 leading-relaxed">
            Subscribe to our newsletter to receive emergency blood requests in your area and latest health tips from our experts.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 text-sm font-medium">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
              Emergency Alerts
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
              Health Tips
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 md:w-1/2 bg-red-700 w-full">
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="w-full px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white transition shadow-lg"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Subscribe Now
            </button>
            <p className="text-center text-xs text-red-200 mt-4 italic">
              * We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;