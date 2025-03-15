import React, { useState } from "react";

const ChallengeFriend = () => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [shareLink, setShareLink] = useState("");

  const generateChallengeLink = () => {
    const link = `${window.location.origin}/play?friend=${encodeURIComponent(username)}&score=${score}&total=${totalAnswered}`;
    setShareLink(link);
  };

  const generateImageUrl = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 315;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#3f51b5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Globetrotter Challenge', canvas.width / 2, 80);
    
    ctx.font = '28px Arial';
    ctx.fillText(`${username} scored ${score}/${totalAnswered}`, canvas.width / 2, 150);
    
    ctx.font = '24px Arial';
    ctx.fillText('Can you beat their score?', canvas.width / 2, 220);
    return canvas.toDataURL('image/png');
  };

  const imageUrl = generateImageUrl();

  const handleWhatsAppShare = () => {
    const whatsappText = `I just scored ${score}/${totalAnswered} in the Globetrotter Challenge! Can you beat my score? Play here: ${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert("Challenge link copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy link. Please copy the URL manually.");
      });
  };

  return (
    <div className="challenge-container">
      <h1>Challenge a Friend</h1>
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
          <img src={imageUrl} alt="Challenge" width="300" height="158" />
          <p>Share this link with your friend:</p>
          <div className="share-buttons">
            <button onClick={handleWhatsAppShare} className="whatsapp-button">
              Share on WhatsApp
            </button>
            <button onClick={handleCopyLink} className="copy-link-button">
              Copy Link
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .challenge-container {
          text-align: center;
          padding: 20px;
        }
        .input-section {
          margin-bottom: 20px;
        }
        .username-input {
          padding: 10px;
          width: 250px;
          margin: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .generate-link-btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .share-section {
          margin-top: 20px;
        }
        .share-buttons {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
        }
        .whatsapp-button {
          background-color: #25D366;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .copy-link-button {
          background-color: #4285F4;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChallengeFriend;
