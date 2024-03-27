"use client";

import { useState, useEffect } from "react";

const ScheduleTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-5 text-center bg-gradient-push ">
      <h2 className="text-white text-2xl font-bold">{formattedTime}</h2>
      <p className="text-white">{formattedDate}</p>
    </div>
  );
};

export default ScheduleTime;
