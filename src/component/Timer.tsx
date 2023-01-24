import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

interface props {
  endTime : Date
} 

const Timer = ({endTime} : props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);

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
    // make a div with the time which is 40px height and 100px width, 
    // with a border radius of 20px, a grey background and a white text, centered, and on all other elements, center them
    <div className="h-10 w-40 bg-gray-300 rounded-2xl flex items-center justify-center" style={{zIndex : 99}}>
      <div className="text-white">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>

    
  );
};

export default Timer;