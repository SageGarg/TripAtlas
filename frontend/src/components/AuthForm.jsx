import React from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

// Configure axios defaults
axios.defaults.withCredentials = true;

function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const isLogin = location.pathname === "/login";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const url = isLogin
      ? "http://localhost:8080/auth/login"
      : "http://localhost:8080/auth/register";

    try {
      const response = await axios.post(url, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (isLogin) {
        if (response.data && response.data.token) {
          login(response.data.token);
          navigate("/explore");
        } else {
          setError("Invalid login response from server");
        }
      } else {
        // If registration is successful, redirect to login
        setError("");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* TravelMate Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-2">TravelMate</h1>
        <p className="text-gray-600 text-lg">Your Personal Travel Companion</p>
      </div>

      <div className="bg-yellow rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Log In" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 underline">
                Register here
              </Link>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;