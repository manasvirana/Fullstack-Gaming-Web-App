import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./components/Game.jsx";
import ChallengeFriend from "./components/ChallengeFriend.jsx";
import "./styles.css";


const App = () => {
  return (

    <Router>
      <div className="app-container">
        <nav className="navbar">
        <Link to="/" className="nav-link">Leaderboard</Link>
        <span className="separator">|</span>
          <Link to="/" className="nav-link">Play Game</Link>
          <span className="separator">|</span>
          <Link to="/challenge" className="nav-link">Challenge a Friend</Link>

        </nav>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/challenge" element={<ChallengeFriend />} />
        </Routes>
      </div>
    </Router>
   
  );
};

export default App;
