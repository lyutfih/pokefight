import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Battle from "./components/Battle/Index";
import Home from "./components/Home/Index";
import Leaderboard from "./components/Leaderboard/Index";

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white">
        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/battle/:id" element={<Battle />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
