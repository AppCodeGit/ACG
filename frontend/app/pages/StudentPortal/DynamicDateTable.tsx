"use client";

import { useState, useEffect } from "react";
import "./style/DynamicDateTable.css";

interface CalendarAndClockProps {
  // Add any props if needed, otherwise empty interface
}

const CalendarAndClock: React.FC<CalendarAndClockProps> = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="calendar-clock-container">
      {/* Header */}
      <div className="head">
        <h1 className="header-title">📅 Calendar & Real-Time Clock</h1>
      </div>

      <div className="real-time-display">
        <div className="real-time-item">
          <h2>🕒</h2>
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Static Calendar */}
      <div className="calendar">
        <iframe
          title="Google Calendar"
          src="https://calendar.google.com/calendar/embed?showTitle=0&showPrint=0&showCalendars=0&mode=MONTH"
          style={{ 
            border: "none",
            width: "100%",
            height: "220px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default CalendarAndClock;