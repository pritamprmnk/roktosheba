import React from 'react';
import { Heart, Users, Asterisk } from 'lucide-react';

const StatusSection = () => {
  const stats = [
    {
      id: 1,
      label: 'Lives Saved',
      value: '12,000+',
      icon: <Heart className="w-5 h-5 text-red-600" />,
    },
    {
      id: 2,
      label: 'Registered Donors',
      value: '4,500',
      icon: <Users className="w-5 h-5 text-red-600" />,
    },
    {
      id: 3,
      label: 'Active Requests',
      value: '150+',
      icon: <Asterisk className="w-5 h-5 text-red-600" />,
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-[#FFF8F8] border border-red-100 rounded-xl p-8 transition-transform hover:scale-105 duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              {stat.icon}
              <span className="text-gray-800 font-medium text-lg">
                {stat.label}
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatusSection;