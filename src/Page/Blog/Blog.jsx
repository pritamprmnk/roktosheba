import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Should You Donate Blood Regularly?",
      excerpt: "Donating blood doesn't just save lives; it has several health benefits for the donor too...",
      date: "Jan 10, 2026",
      author: "Dr. Rakibul Hasan",
      image: "https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "What to Eat Before and After Blood Donation",
      excerpt: "Proper nutrition is key to a quick recovery after donating blood. Learn which foods help...",
      date: "Jan 05, 2026",
      author: "Nutritionist Sara",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Common Myths About Blood Donation",
      excerpt: "Many people are afraid to donate due to myths. Let's debunk the most common ones today...",
      date: "Dec 28, 2025",
      author: "Admin Team",
      image: "https://images.unsplash.com/photo-1579154235602-3c205169119f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Health <span className="text-red-600">Articles</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about blood donation, health tips, and stories that inspire us to save lives every day.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                  <span>{post.date}</span>
                  <span className="text-red-500 font-medium">• By {post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-red-600 cursor-pointer transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-red-600 font-semibold text-sm hover:underline flex items-center">
                  Read Full Story
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / CTA */}

      </div>
    </div>
  );
};

export default Blog;