import React from 'react';
import './AnimatedRobot.css';

interface AnimatedRobotProps {
  size?: number;
}

const AnimatedRobot: React.FC<AnimatedRobotProps> = ({ size = 200 }) => {
  return (
    <div className="robot-container" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="robot-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for robot body */}
          <linearGradient id="robotBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f8f9fa', stopOpacity: 1 }} />
          </linearGradient>

          {/* Gradient for glowing eyes */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#00aaff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00aaff', stopOpacity: 0 }} />
          </radialGradient>

          {/* Gradient for solar panel */}
          <linearGradient id="solarPanel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00ff99', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#00aaff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00ff99', stopOpacity: 1 }} />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Background ambient glow */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="#00ff99"
          strokeWidth="1"
          opacity="0.2"
          className="ambient-glow"
        />

        {/* Robot Shadow */}
        <ellipse
          cx="100"
          cy="195"
          rx="45"
          ry="8"
          fill="#000000"
          opacity="0.2"
          filter="url(#shadow)"
        />

        {/* Robot Body */}
        <g className="robot-body">
          {/* Main body */}
          <ellipse
            cx="100"
            cy="140"
            rx="35"
            ry="45"
            fill="url(#robotBody)"
            stroke="#e9ecef"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Head */}
          <circle
            cx="100"
            cy="80"
            r="30"
            fill="url(#robotBody)"
            stroke="#e9ecef"
            strokeWidth="2"
            className="robot-head"
            filter="url(#shadow)"
          />

          {/* Eyes */}
          <circle
            cx="88"
            cy="75"
            r="4"
            fill="#00aaff"
            filter="url(#glow)"
            className="robot-eye left-eye"
          />
          <circle
            cx="112"
            cy="75"
            r="4"
            fill="#00aaff"
            filter="url(#glow)"
            className="robot-eye right-eye"
          />

          {/* Eye glow effects */}
          <circle
            cx="88"
            cy="75"
            r="8"
            fill="url(#eyeGlow)"
            opacity="0.6"
            className="eye-glow left-glow"
          />
          <circle
            cx="112"
            cy="75"
            r="8"
            fill="url(#eyeGlow)"
            opacity="0.6"
            className="eye-glow right-glow"
          />

          {/* Smile/Mouth */}
          <path
            d="M 85 90 Q 100 95 115 90"
            stroke="#495057"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="robot-mouth"
          />

          {/* Antenna */}
          <line
            x1="100"
            y1="50"
            x2="100"
            y2="35"
            stroke="#e9ecef"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="32"
            r="3"
            fill="#00ff99"
            filter="url(#glow)"
            className="antenna-light"
          />

          {/* Left Arm */}
          <g className="left-arm">
            <line
              x1="65"
              y1="110"
              x2="45"
              y2="95"
              stroke="#e9ecef"
              strokeWidth="8"
              strokeLinecap="round"
              className="arm upper-arm"
            />
            <circle
              cx="40"
              cy="90"
              r="8"
              fill="url(#robotBody)"
              stroke="#e9ecef"
              strokeWidth="2"
              className="hand left-hand"
              filter="url(#shadow)"
            />
            {/* Green accent light on left arm */}
            <circle
              cx="55"
              cy="102"
              r="3"
              fill="#00ff99"
              filter="url(#glow)"
              className="accent-light left-accent"
            />
          </g>

          {/* Right Arm */}
          <g className="right-arm">
            <line
              x1="135"
              y1="110"
              x2="155"
              y2="95"
              stroke="#e9ecef"
              strokeWidth="8"
              strokeLinecap="round"
              className="arm upper-arm"
            />
            <circle
              cx="160"
              cy="90"
              r="8"
              fill="url(#robotBody)"
              stroke="#e9ecef"
              strokeWidth="2"
              className="hand right-hand"
              filter="url(#shadow)"
            />
            {/* Green accent light on right arm */}
            <circle
              cx="145"
              cy="102"
              r="3"
              fill="#00ff99"
              filter="url(#glow)"
              className="accent-light right-accent"
            />
          </g>

          {/* Chest accent light */}
          <circle
            cx="100"
            cy="125"
            r="4"
            fill="#00aaff"
            filter="url(#glow)"
            className="chest-light"
          />

          {/* Legs */}
          <line
            x1="85"
            y1="185"
            x2="75"
            y2="200"
            stroke="#e9ecef"
            strokeWidth="6"
            strokeLinecap="round"
            className="leg left-leg"
          />
          <line
            x1="115"
            y1="185"
            x2="125"
            y2="200"
            stroke="#e9ecef"
            strokeWidth="6"
            strokeLinecap="round"
            className="leg right-leg"
          />

          {/* Feet */}
          <ellipse
            cx="75"
            cy="205"
            rx="8"
            ry="4"
            fill="#e9ecef"
            className="foot left-foot"
          />
          <ellipse
            cx="125"
            cy="205"
            rx="8"
            ry="4"
            fill="#e9ecef"
            className="foot right-foot"
          />
        </g>

        {/* Solar Panel */}
        <g className="solar-panel">
          <rect
            x="140"
            y="60"
            width="40"
            height="25"
            rx="3"
            fill="url(#solarPanel)"
            stroke="#00ff99"
            strokeWidth="2"
            filter="url(#glow)"
            className="panel-body"
          />

          {/* Solar cells */}
          <rect x="142" y="62" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-1" />
          <rect x="152" y="62" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-2" />
          <rect x="162" y="62" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-3" />
          <rect x="142" y="70" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-4" />
          <rect x="152" y="70" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-5" />
          <rect x="162" y="70" width="8" height="6" fill="#ffffff" opacity="0.9" className="solar-cell cell-6" />

          {/* Sun rays emanating from panel */}
          <g className="sun-rays">
            <line x1="160" y1="40" x2="160" y2="55" stroke="#ffff00" strokeWidth="2" filter="url(#glow)" className="ray ray-1" />
            <line x1="145" y1="45" x2="155" y2="55" stroke="#ffff00" strokeWidth="2" filter="url(#glow)" className="ray ray-2" />
            <line x1="175" y1="45" x2="165" y2="55" stroke="#ffff00" strokeWidth="2" filter="url(#glow)" className="ray ray-3" />
          </g>
        </g>

        {/* Floating energy particles */}
        <g className="floating-particles">
          <circle cx="50" cy="50" r="2" fill="#00ff99" opacity="0.7" className="particle particle-1" />
          <circle cx="150" cy="30" r="1.5" fill="#00aaff" opacity="0.6" className="particle particle-2" />
          <circle cx="30" cy="120" r="1" fill="#00ff99" opacity="0.8" className="particle particle-3" />
          <circle cx="170" cy="150" r="1.5" fill="#00aaff" opacity="0.5" className="particle particle-4" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedRobot;
