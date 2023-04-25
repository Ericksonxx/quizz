import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.scss';

const Timer = ({ duration, onTimeout, onTimeUpdate }) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
    } else {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      onTimeUpdate(remainingTime);

      return () => clearTimeout(timer);
    }
  }, [remainingTime, onTimeout, onTimeUpdate]);

  return (
    <div className="timer">
      Time remaining: {remainingTime}s
    </div>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
};

export default Timer;
