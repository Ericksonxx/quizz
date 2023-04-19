import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Question from './Question/Question';
import Timer from './Timer';
import './Quiz.scss';

const Quiz = ({ questions, duration, onQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    if (questions.length > 0 && (isQuizCompleted || currentQuestionIndex >= questions.length)) {
        onQuizCompleted(score);
    }
    if (isQuizCompleted || currentQuestionIndex >= questions.length) {
      onQuizCompleted(score);
    }
  }, [isQuizCompleted, currentQuestionIndex, onQuizCompleted, score, questions.length]);

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuizTimeout = () => {
    setIsQuizCompleted(true);
  };

  if (currentQuestionIndex >= questions.length) {
    return <div className="quiz">Quiz completed!</div>;
  }

  const questionData = questions[currentQuestionIndex];
  return (
    <div className="quiz">
      <Timer duration={duration} onTimeout={handleQuizTimeout} />
      <Question
        question={questionData.question}
        options={questionData.options}
        correctAnswer={questionData.correctAnswer}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      correctAnswer: PropTypes.string,
    })
  ).isRequired,
  duration: PropTypes.number.isRequired,
  onQuizCompleted: PropTypes.func.isRequired,
};

export default Quiz;
