import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./components/Game.jsx"; // Your Game component
import ChallengeFriend from "./components/ChallengeFriend.jsx"; // Your ChallengeFriend component
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Links */}
        <nav>
          <Link to="/">Game</Link> | <Link to="/challenge">Challenge a Friend</Link>
        </nav>

        {/* Define the Routes */}
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/challenge" element={<ChallengeFriend />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
