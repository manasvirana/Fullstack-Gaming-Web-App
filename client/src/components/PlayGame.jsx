import React, { useEffect, useState } from "react";

const PlayGame = () => {
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const friendUsername = queryParams.get("friend");
    const score = queryParams.get("score");
    const totalAnswered = queryParams.get("total");

    if (friendUsername && score && totalAnswered) {
      setFriendData({
        username: friendUsername,
        score: score,
        totalAnswered: totalAnswered,
      });
    }
  }, []);

  return (
    <div className="play-container">
      {friendData ? (
        <>
          <h1>Welcome to the Challenge!</h1>
          <p>You're playing against {friendData.username}</p>
          <p>Inviter's score: {friendData.score}/{friendData.totalAnswered}</p>
          <button className="start-game-btn">Start Playing</button>
        </>
      ) : (
        <p>Loading challenge...</p>
      )}
      <style jsx>{`
        .play-container {
          text-align: center;
          padding: 20px;
        }
        .start-game-btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PlayGame;
