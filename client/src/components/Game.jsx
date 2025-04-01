import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config.js";

//confetti
const Confetti = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"];
    const newParticles = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 20 - 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 1
      });
    }
    
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      setParticles([]);
    }, 2500);
    const submitScore = async () => {
      if (!user) return;
    
      try {
        await fetch(`${API_BASE_URL}/api/scores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ username: user.username, score, totalAnswered }),
        });
      } catch (error) {
        console.error("Failed to submit score:", error);
      }
    };
    
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="confetti-container" style={{ position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 100
      }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: '50%',
            transform: `rotate(${p.rotation}deg)`,
            animation: `fall ${p.speed}s linear forwards`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
          }
        }
      `}</style>
    </div>
  );
};

//sad
const SadFace = () => {
  return (
    <div className="sad-face" style={{ fontSize: '60px', animation: 'shake 0.5s' }}>
      😢
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .sad-face {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

const Game = () => {
    const [destination, setDestination] = useState(null);
    const [userGuess, setUserGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [totalAnswered, setTotalAnswered] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showSadFace, setShowSadFace] = useState(false);
    const [funFact, setFunFact] = useState("");
    
  useEffect(() => {
    fetchDestinations();
  }, []);
  
  const fetchDestinations = async () => {
    try {
      console.log("Fetching from:", API_BASE_URL);
      const response = await fetch(API_BASE_URL);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
        console.log("Fetched Data:", data);
        if (Array.isArray(data) && data.length > 0) {
            const randomDestination = data[Math.floor(Math.random() * data.length)];
            console.log("Selected destination:", randomDestination);
            setDestination(randomDestination);
            if (randomDestination.funFact) {
                setFunFact(randomDestination.funFact);
            } else if (randomDestination.description) {
                setFunFact(`Fun fact: ${randomDestination.description}`);
            } else {
                setFunFact(`Fun fact: This destination is a fascinating place to visit!`);
            }
        } else if (data && typeof data === 'object') {
            console.log("Single destination:", data);
            setDestination(data);
            setFunFact(data.funFact || `Fun fact: ${data.name || 'This destination'} is known for its unique culture!`);
        } else {
            console.error("Unexpected data format:", data);
            setDestination(null);
            setFeedback("Failed to parse destination data.");
        }
        setShowConfetti(false);
        setShowSadFace(false);
        setFeedback("");
    } catch (error) {
        console.error("Fetch Error:", error);
        setFeedback("Failed to load destinations.");
    }
};
  
  const handleGuess = () => {
    console.log("Submit Clicked!");
    
    if (!userGuess.trim() || !destination) {
      console.log("Empty guess or no destination, skipping");
      return;
    }
    const possibleNameProps = ['name', 'title', 'location', 'city', 'country', 'place'];
    const answerProp = possibleNameProps.find(prop => destination[prop]);
    
    if (!answerProp) {
      console.error("Could not find a valid name property in:", destination);
      setFeedback("Error: Cannot determine the answer from destination data.");
      return;
    }
    
    const answer = destination[answerProp];
    
    const normalizedGuess = userGuess.toLowerCase().replace(/\s+/g, "");
    const normalizedAnswer = answer.toLowerCase().replace(/\s+/g, "");
    
    console.log("User:", normalizedGuess, "Correct:", normalizedAnswer);
    setTotalAnswered(prev => prev + 1);
    
    if (normalizedGuess === normalizedAnswer) {
      setScore(prevScore => prevScore + 1);
      setFeedback("🎉 Correct! " + funFact);
      setShowConfetti(true);
      setShowSadFace(false);
    } else {
      setFeedback(`😢 Incorrect! The correct answer was ${answer}. ${funFact}`);
      setShowConfetti(false);
      setShowSadFace(true);
    }
    
    setUserGuess("");
  };

  const handleNextQuestion = () => {
    setFeedback("");
    setShowConfetti(false);
    setShowSadFace(false);
    fetchDestinations();
  };

  const handleRestart = () => {
    setScore(0);
    setTotalAnswered(0);
    setUserGuess("");
    setFeedback("");
    setShowConfetti(false);
    setShowSadFace(false);
    fetchDestinations();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGuess();
    }
  };
  
  const handleShareLink = () => {
    // Generate a shareable link
    const shareUrl = window.location.href;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert("Game link copied to clipboard! Share it with your friends.");
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy link. Please copy the URL manually.");
      });
  };
  
  // Function to get the best available clue from destination object
  const getClue = (destination) => {
    if (!destination) return "Loading...";
    
    // Check if clues is an array and has items
    if (Array.isArray(destination.clues) && destination.clues.length > 0) {
      return destination.clues[0];
    }
    
    // Check for a single clue property
    if (destination.clue) return destination.clue;
    
    // Check other possible properties
    if (destination.hint) return destination.hint;
    if (destination.description) return destination.description;
    
    // Check if clue is a string directly
    if (typeof destination.clues === 'string') return destination.clues;
    
    // Last resort, check if we can extract from other properties
    if (destination.name) return `This is a popular destination known for its unique characteristics.`;
    
    // If nothing works
    console.error("No clue found in destination data:", destination);
    return "Clue unavailable. Please try restarting the game.";
  };
  
  return (
    <div className="game-container">
      {showConfetti && <Confetti />}
      
      <h1>Globetrotter Challenge</h1>
      
      {destination ? (
        <div>
          <p><strong>Clue:</strong> {getClue(destination)}</p>
          <div>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Your guess"
              disabled={!!feedback} 
            />
            <button 
              type="button" 
              onClick={handleGuess}
              disabled={!!feedback}
            >
              Submit
            </button>
          </div>
          
          {feedback && (
            <div className="feedback-container">
              {showSadFace && <SadFace />}
              <p className="feedback">{feedback}</p>
              <button type="button" onClick={handleNextQuestion} className="next-button">
                Next Question
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading destination...</p>
      )}
      
      <div>
        <button type="button" onClick={handleRestart} className="restart-button">
          Restart Game
        </button>
        <button type="button" onClick={handleShareLink} className="share-button">
          Invite a Friend
        </button>
      </div>
      
      <div className="score-container">
        <p className="score">
          <strong>Score:</strong> {score}/{totalAnswered} ({totalAnswered > 0 ? Math.round((score/totalAnswered) * 100) : 0}%)
        </p>
      </div>
    </div>
  );
};

export default Game;