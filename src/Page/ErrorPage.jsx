import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">


      {/* Image */}
      <img 
        src="/assets/error-404.png"
        alt="App Not Found" 
        className="max-w-sm mb-8"
      />


      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        Oops, page not found!
      </h1>

      <p className="text-gray-600 text-center mb-6">
        The page you are looking for is not available.
      </p>

 
 
      <button 
        onClick={goHome}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
      >
        Go Back!
      </button>
    </div>
  );
};

export default ErrorPage;
