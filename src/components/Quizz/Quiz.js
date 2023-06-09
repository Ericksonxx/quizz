import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Question from './Question/Question';
import Timer from './Timer';
import './Quiz.scss';
import Winner from '../Winner';
import ScoreScreen from '../ScoreScreen'

const Quiz = ({ questions, duration, onQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);


  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuizTimeout = () => {
    onQuizCompleted(score, duration - remainingTime);
  };

  if (currentQuestionIndex >= questions.length) {
    if(score >= 4){
        return <Winner />;
    } else {
        return <ScoreScreen />;
    }
  }

  const questionData = questions[currentQuestionIndex];
  return (
    <div className="quiz">
      <Timer
        duration={duration}
        onTimeout={handleQuizTimeout}
        onTimeUpdate={setRemainingTime}
      />
      {questionData && (
        <Question
          question={questionData.question}
          options={questionData.options}
          correctAnswer={questionData.correctAnswer}
          onAnswerSelected={handleAnswerSelected}
        />
      )}
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
