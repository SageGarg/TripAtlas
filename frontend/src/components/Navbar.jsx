import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`${isHome ? 'absolute w-full bg-transparent' : 'bg-white shadow-md'} px-6 py-4 z-50`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-2xl font-bold ${isHome ? 'text-white' : 'text-blue-600'}`}
            >
              TravelMate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/explore" 
              className={`font-medium ${isHome ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Explore Destinations
            </Link>
            
            <Link 
              to="/feedback"
              className={`font-medium ${isHome ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Travel Stories
            </Link>
            <Link 
              to="/feedback/new" 
              className={`font-medium ${isHome ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Share Experience
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${isHome ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </Link>
            {!isHome && (
              <Link 
                to="/weather" 
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Weather
              </Link>
            )}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`px-4 py-2 rounded-md font-medium ${
                      isHome
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-md font-medium ${
                      isHome
                        ? 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md font-medium ${
                    isHome
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isHome ? 'text-white' : 'text-gray-700'} hover:opacity-75`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <Link
              to="/explore"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Destinations
            </Link>
            
            <Link
              to="/feedback"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Travel Stories
            </Link>
            <Link
              to="/feedback/new"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Share Experience
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {!isHome && (
              <Link
                to="/weather"
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Weather
              </Link>
            )}
            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-center rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
