"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Strawberry from "./images/strawBerry.png";
import "./style/CircularProgressBar.css";

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  showAnimation?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 160,
  strokeWidth = 12,
  trackColor = "#e2e8f0",
  progressColor = "#e9691e",
  showAnimation = true,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    if (showAnimation) {
      let start = 0;
      const duration = 1000;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setAnimatedPercentage(Math.floor(progress * percentage));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, showAnimation]);

  const getGradientId = () => {
    return `progress-gradient-${percentage}`;
  };

  const gradientId = getGradientId();

  return (
    <div className="circular-progress-container">
      <div
        className="circular-progress-wrapper"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="progress-ring-svg">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e9691e" />
              <stop offset="50%" stopColor="#f08b4a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Shadow circle for depth */}
          <circle
            className="progress-ring__shadow"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth={strokeWidth + 4}
            fill="transparent"
            r={radius + 2}
            cx={size / 2}
            cy={size / 2}
          />
          
          {/* Track circle */}
          <circle
            className="progress-ring__track"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          
          {/* Progress circle with gradient */}
          <circle
            className="progress-ring__progress"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: animatedPercentage > 0 ? "url(#glow)" : "none",
            }}
          />
          
          {/* Inner decoration circles */}
          <circle
            className="progress-ring__inner"
            stroke={`url(#${gradientId})`}
            strokeWidth={2}
            fill="none"
            r={radius - 6}
            cx={size / 2}
            cy={size / 2}
            opacity="0.3"
          />
        </svg>
        
        {/* Center content */}
        <div className="circular-progress-content">
          <div className="percentage-wrapper">
            <span className="percentage-number">{animatedPercentage}</span>
            <span className="percentage-symbol">%</span>
          </div>
          <div className="percentage-label">Complete</div>
          <div className="progress-stats">
            <span className="stats-value">{percentage}%</span>
            <span className="stats-label">Target</span>
          </div>
        </div>
        
        {/* Floating decoration */}
        <div className="progress-decoration">
          <div className="decoration-ring"></div>
          <div className="decoration-dot"></div>
        </div>
      </div>
      
      {/* Strawberry icon moved to bottom */}
      <div className="circular-progress-footer">
        <div className="strawberry-wrapper">
          <Image src={Strawberry} alt="Strawberry" width={28} height={28} className="strawberry-icon" />
          <span className="strawberry-text">Keep Going!</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;