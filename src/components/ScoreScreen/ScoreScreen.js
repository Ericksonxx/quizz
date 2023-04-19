import React from 'react';
import './ScoreScreen.scss';

const ScoreScreen = ({ score, correctAnswers, wrongAnswers }) => {
  const handleTwitterClick = () => {
    // Implement Twitter button click handler here
  };

  const handleLinkedInClick = () => {
    // Implement LinkedIn button click handler here
  };

  const handleWebsiteClick = () => {
    // Implement website button click handler here
  };

  return (
    <div className="score-screen">
      <h2>Your Score</h2>
      <div className="score-container">
        <div className="score">
          <span>{score}</span>
          <span>out of 5</span>
        </div>
        <div className="summary">
          <div className="correct-answers">
            <span>{correctAnswers}</span>
            <span>Correct Answers</span>
          </div>
          <div className="wrong-answers">
            <span>{wrongAnswers}</span>
            <span>Wrong Answers</span>
          </div>
        </div>
      </div>
      <div className="social-container">
        <button onClick={handleTwitterClick}>
          Share on Twitter
        </button>
        <button onClick={handleLinkedInClick}>
          Share on LinkedIn
        </button>
        <button onClick={handleWebsiteClick}>
          Visit Our Website
        </button>
      </div>
    </div>
  );
};

export default ScoreScreen;
