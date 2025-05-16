import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-white to-orange-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-32 right-40 w-88 h-88 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-6000"></div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative pt-12 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Left Column - Text Content */}
              <div className="relative lg:py-16">
                <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-8 lg:p-12 shadow-xl">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="block">Welcome to</span>
                    <span className="block text-blue-600 mt-2">TravelMate</span>
                  </h1>
                  <p className="mt-6 text-xl text-gray-700 max-w-3xl">
                    Your personal travel companion for discovering amazing destinations, checking weather conditions, and sharing experiences with fellow travelers.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/explore"
                      className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Start Exploring
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-blue-700 bg-white/50 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="relative -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="backdrop-blur-sm bg-white/70 rounded-3xl p-8 lg:p-12 shadow-xl">
              <div className="lg:text-center mb-8">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Everything you need for your travel plans
                </p>
              </div>

              <div className="mt-8">
                <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                  {/* Weather Feature */}
                  <div className="relative group">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-blue-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div className="ml-20">
                      <p className="text-xl font-semibold text-gray-900">Real-time Weather</p>
                      <p className="mt-2 text-base text-gray-600">
                        Get accurate weather forecasts for your destinations.
                      </p>
                    </div>
                  </div>

                  {/* Destinations Feature */}
                  <div className="relative group">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-blue-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                    </div>
                    <div className="ml-20">
                      <p className="text-xl font-semibold text-gray-900">Popular Destinations</p>
                      <p className="mt-2 text-base text-gray-600">
                        Explore curated lists of amazing places to visit.
                      </p>
                    </div>
                  </div>

                  {/* Reviews Feature */}
                  <div className="relative group">
                    <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-blue-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="ml-20">
                      <p className="text-xl font-semibold text-gray-900">Traveler Reviews</p>
                      <p className="mt-2 text-base text-gray-600">
                        Share and read authentic travel experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
