import React, { useState } from 'react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register as a blood donor?",
      answer: "Click on the 'Registration' button in the navigation bar. Fill in your details, including your blood group, district, and upazila. Once registered, your profile will be visible to those searching for donors in your area."
    },
    {
      question: "Who can donate blood?",
      answer: "Generally, anyone between 18-60 years old, weighing at least 50kg, and in good health can donate blood. However, it's best to consult a doctor if you have underlying health conditions or are on medication."
    },
    {
      question: "How often can I donate blood?",
      answer: "A healthy individual can safely donate blood every 3 to 4 months (90-120 days). This allows your body enough time to replenish its red blood cells."
    },
    {
      question: "Is there any cost involved in using RoktoSheba?",
      answer: "No, RoktoSheba is a completely free platform dedicated to saving lives. We strictly prohibit the buying and selling of blood."
    },
    {
      question: "How do I create a blood donation request?",
      answer: "Log in to your Donor Dashboard and click on 'Create Donation Request'. Provide details like the patient's condition, hospital location, and a contact number. Your request will then appear in the 'Pending Requests' section for others to see."
    },

  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold text-gray-700">{faq.question}</span>
              <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-4 bg-gray-50 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default FAQs;