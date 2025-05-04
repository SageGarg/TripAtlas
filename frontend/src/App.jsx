import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-orange-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//Testing

// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600">Hello, TravelMate!</h1>
//     </div>
//   );
// }

// export default App;

