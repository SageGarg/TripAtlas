import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./index.css";
import AuthForm from "./components/AuthForm";
import Explore from "./components/Explore";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import DestinationDetail from "../pages/DestinationDetail.jsx";

function LayoutWrapper() {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return isAuthPage ? (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 via-white to-orange-200 animate-gradient-x">
      {/* Fancy blurred shapes */}
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Auth Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/70 rounded-xl shadow-xl p-10 w-full max-w-md mx-4 border border-white/30">
        <Routes>
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/register" element={<AuthForm type="register" />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Routes>
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:countryCode" element={<CountryDetails />} />
      <Route path="/destination" element={<DestinationDetail />} />
    </Routes>
  );
}

// frontend/src/App.jsx
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
        <Route path="/destination" element={<DestinationDetail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:countryCode" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
