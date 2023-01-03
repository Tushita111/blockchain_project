import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

interface props {
  endTime : Date
} 

const Timer = ({endTime} : props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = useCallback(() => {
    const time = endTime.getTime() - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor(time / (1000 * 60 * 60)));// add % 24 to modulate by the day
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }, [endTime]);

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [getTime]);

  return (
    <span className="timer">
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export default Timer;