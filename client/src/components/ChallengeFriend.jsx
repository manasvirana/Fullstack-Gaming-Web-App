import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChallengeFriend = ({ gameScore, gameTotalAnswered }) => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(gameScore || 0);
  const [totalAnswered, setTotalAnswered] = useState(gameTotalAnswered || 0);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (gameScore !== undefined) setScore(gameScore);
    if (gameTotalAnswered !== undefined) setTotalAnswered(gameTotalAnswered);
  }, [gameScore, gameTotalAnswered]);

  const generateChallengeLink = () => {
    if (!username.trim()) {
      alert("Please enter a username first!");
      return;
    }
    const baseUrl = window.location.origin;
    const challengeLink = `${baseUrl}/play?challenger=${encodeURIComponent(username)}&score=${score}&total=${totalAnswered}`;
    setShareLink(challengeLink);
  };

  const handleWhatsAppShare = () => {
    const whatsappText = `I just scored ${score}/${totalAnswered} in the Globetrotter Challenge! Can you beat my score? Play here: ${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy link. Please copy the URL manually.");
      });
  };

  return (
    <div className="challenge-container">
      <h1>Challenge a Friend</h1>
      <div className="score-display">
        <p>Your score: <strong>{score}/{totalAnswered}</strong></p>
      </div>
      
      <div className="input-section">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="username-input"
        />
        <button onClick={generateChallengeLink} className="generate-link-btn">
          Generate Challenge Link
        </button>
      </div>
      
      {shareLink && (
        <div className="share-section">
          <h2>Share Your Challenge</h2>
          <div className="challenge-preview">
            <div className="preview-card">
              <h3>Globetrotter Challenge</h3>
              <p>{username} scored {score}/{totalAnswered}</p>
              <p>Can you beat their score?</p>
            </div>
          </div>
          
         
            <button 
              onClick={handleCopyLink} 
              className="copy-link-button"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
         
          
          <div className="share-buttons">
            <button onClick={handleWhatsAppShare} className="whatsapp-button">
              Share on WhatsApp
            </button>
            <button onClick={() => navigate('/game')} className="back-button">
              Back to Game
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .challenge-container {
          text-align: center;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .score-display {
          margin-bottom: 20px;
          font-size: 18px;
        }
        
        .input-section {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        
        .username-input {
          padding: 12px;
          width: 100%;
          max-width: 350px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        
        .generate-link-btn {
          background-color: #4CAF50;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        .generate-link-btn:hover {
          background-color: #3e8e41;
        }
        
        .share-section {
          margin-top: 30px;
          padding: 20px;
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        
        .challenge-preview {
          margin: 20px 0;
        }
        
        .preview-card {
          background-color: #3f51b5;
          color: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .preview-card h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }
        
        .preview-card p {
          font-size: 18px;
          margin: 10px 0;
        }
        
        .link-display {
          display: flex;
          margin: 20px 0;
          justify-content: center;
        }
        
        .share-link-input {
          padding: 10px;
          width: 70%;
          border-radius: 8px 0 0 8px;
          border: 1px solid #ccc;
          border-right: none;
        }
        
        .copy-link-button {
          background-color: #4285F4;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          min-width: 100px;
        }
        
        .share-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        
        .whatsapp-button {
          background-color: #25D366;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        
        .back-button {
          background-color: #747474;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChallengeFriend;