import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DestinationDetail from "../pages/DestinationDetail.jsx";

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
