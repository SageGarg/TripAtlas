import React from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isLogin && password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const url = isLogin
    ? "http://localhost:8080/auth/login"
    : "http://localhost:8080/auth/register";

  try {
    await axios.post(url, { email, password });

    if (isLogin) {
      alert("Welcome back, traveler!");
      navigate("/explore"); // 👈 Redirect on login
    } else {
      alert("Registration successful! Please log in.");
      navigate("/login");
    }
  } catch (err) {
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="bg-yellow rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {isLogin ? "Login to TravelMate" : "Register for TravelMate"}
      </h2>

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
            Don’t have an account?{" "}
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
  );
}

export default AuthForm;