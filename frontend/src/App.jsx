import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationDetail from "/Users/rj/ISU/Spring2025/COMS 3190/FinalProject/PS_3/frontend/pages/DestinationDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/destination" element={<DestinationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
