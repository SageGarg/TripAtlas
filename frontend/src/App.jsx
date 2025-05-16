import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import Explore from "./components/Explore";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./components/About";
import FeedbackSubmission from "./components/Feedback/FeedbackSubmission";
import SubmissionConfirmation from "./components/Feedback/SubmissionConfirmation";
import FeedbackList from "./components/Feedback/FeedbackList";

// Layout wrapper to handle conditional rendering of Navbar and special layouts
function LayoutWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/register"];
  const isAuthPage = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Navbar />}

      {["/login", "/register"].includes(location.pathname) ? (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-300 via-white to-orange-200 animate-gradient-x">
          {/* Background blobs */}
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
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:countryCode" element={<CountryDetails />} />
          <Route path="/destination" element={<DestinationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback/new" element={<FeedbackSubmission />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/feedback/confirmation" element={<SubmissionConfirmation />} />
        </Routes>
      )}
    </div>
  );
}

// Main App
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
