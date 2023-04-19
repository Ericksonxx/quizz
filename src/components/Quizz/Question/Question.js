import React from 'react';
import PropTypes from 'prop-types';
import './Question.scss';

const Question = ({ question, options, correctAnswer, onAnswerSelected }) => {
  const handleOptionClick = (option) => {
    // Check if the selected option is correct or not
    const isCorrect = option.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    // Add these lines for debugging
    console.log('Selected option:', option);
    console.log('Correct answer:', correctAnswer);
    console.log('Is correct:', isCorrect);

    // Call the onAnswerSelected prop with the isCorrect value
    onAnswerSelected(isCorrect);
  };

  return (
    <div className="question">
      <div className="question-text">{question}</div>
      <div className="question-options">
        {options.map((option, index) => (
          <button
            key={index}
            className="question-option"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Question;
