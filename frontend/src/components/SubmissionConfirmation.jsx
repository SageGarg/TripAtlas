import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SubmissionConfirmation = () => {
  const location = useLocation();
  const { type, destination } = location.state || { type: 'feedback', destination: 'your destination' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Thank You for Sharing!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your {type === 'blog' ? 'blog post' : 'feedback'} about {destination} has been successfully submitted.
          </p>

          <div className="space-y-4">
            <p className="text-gray-600">
              Your contribution helps other travelers make better decisions!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/explore"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Explore More Destinations
              </Link>
              
              <Link
                to="/feedback/new"
                className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Share Another Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation; 