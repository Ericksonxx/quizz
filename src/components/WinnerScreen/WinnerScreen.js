import React from 'react';
import './Winner.scss';

const Winner = ({ score, correctAnswers, incorrectAnswers, onReset }) => {
  return (
    <div className="winner">
      <h1>Congratulations!</h1>
      <p>You got {score} out of 5 questions right!</p>
      <h2>Correct Answers:</h2>
      <ul>
        {correctAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <h2>Incorrect Answers:</h2>
      <ul>
        {incorrectAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Winner;
