import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
          About TravelMate Team
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sageena's Profile */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="flex flex-col items-center">
              <img
                src="/images/sageena.jpg"
                alt="Sageena Garg"
                className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-blue-100"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=SG';
                }}
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sageena Garg</h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">Course:</span> COMS 3190</p>
                <p><span className="font-semibold">Author:</span> Sageena Garg</p>
                <p><span className="font-semibold">Email:</span> sg1807@iastate.edu</p>
                <p><span className="font-semibold">Date:</span> May 16, 2025</p>
                <p><span className="font-semibold">Professor's Name:</span> Abraham Aldaco</p>
              </div>
            </div>
          </div>

          {/* Rishabh's Profile */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <div className="flex flex-col items-center">
              <img
                src="/images/rishabh.jpg"
                alt="Rishabh Jain"
                className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-blue-100"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=RJ';
                }}
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Rishabh Jain</h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">Course:</span> COMS 3190</p>
                <p><span className="font-semibold">Author:</span> Rishabh Jain</p>
                <p><span className="font-semibold">Email:</span> rishabhj@iastate.edu</p>
                <p><span className="font-semibold">Date:</span> May 16, 2025</p>
                <p><span className="font-semibold">Professor's Name:</span> Abraham Aldaco</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">About the Project</h2>
          <p className="text-gray-600 leading-relaxed">
            TravelMate is a full-stack web application designed to help users plan their trips more efficiently.
            It combines destination information, real-time weather updates, and user reviews in one seamless platform.
            Built using modern technologies like React, Node.js, and MongoDB, this project showcases our team's
            commitment to creating user-friendly and efficient travel planning solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 