import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.scss';

const Timer = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return <div className="timer">{formatTime(timeLeft)}</div>;
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired,
};

export default Timer;
