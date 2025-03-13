import React, { memo, useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

function TestClock({ testDuration, handleSubmit }) {
  const [timeLeft, setTimeLeft] = useState(testDuration * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <div className="w-1/2 bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all duration-300"
          style={{
            width: `${(timeLeft / (1 * 60)) * 100}%`,
            background: `linear-gradient(to right, 
      red ${(timeLeft / (1 * 60)) * 0}%, 
      orange ${(timeLeft / (1 * 60)) * 50}%, 
      green 100%)`,
          }}
        ></div>
      </div>
      <p className="text-lg flex flex-row items-center font-semibold">
        <FcAlarmClock className="text-xl mr-2 font-bold" />
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
    </>
  );
}

export default memo(TestClock);
