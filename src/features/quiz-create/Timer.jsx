import React, { useState, useEffect } from "react";

const Timer = ({ timeLeft,setTimeEnd}) => {
  const [delay, setDelay] = useState(+timeLeft);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  if(minutes===0&&seconds===0){
    setTimeEnd(true);
  }

  return (
    <>
      <span>
        {minutes}:{seconds}
      </span>
    </>
  );
};

export default Timer;