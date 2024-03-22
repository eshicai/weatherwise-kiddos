import React, { useState, useEffect } from 'react';

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Custom formatting function to display the time in 12-hour format with AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zero for minutes less than 10
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${period}`;
  };

  // Format the current time
  const formattedTime = formatTime(currentTime);

  return (
    <div>
      <p>Now {formattedTime}</p>
    </div>
  );
}
