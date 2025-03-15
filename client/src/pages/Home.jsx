import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Travel App</h1>
      <Link to="/destinations">
        <button>View Destinations</button>
      </Link>
    </div>
  );
};

export default Home;
