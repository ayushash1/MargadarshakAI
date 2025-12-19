import React from 'react';

const HeroIllustration = () => {
  // Using the colors defined in your CSS variables
  const primaryBlue = '#2563eb';
  const lightBlueBg = '#dbeafe'; 
  const mutedBlue = '#93c5fd';
  const white = '#ffffff';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 400"
      className="hero-svg-container"
      style={{ width: '100%', height: 'auto', maxWidth: '600px' }}
      role="img"
      aria-label="Illustration of AI connecting a candidate to an internship"
    >
      {/* Background Blob */}
      <rect x="50" y="50" width="500" height="300" rx="24" fill={lightBlueBg} opacity="0.5" />
      <rect x="70" y="70" width="460" height="260" rx="16" fill={white} opacity="0.8" />
       
      {/* Decorative connecting lines (The "AI Network") */}
      <g stroke={mutedBlue} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4">
         <path d="M150 200 C 200 100, 300 100, 450 200" />
         <path d="M150 200 C 200 300, 300 300, 450 200" />
         <line x1="150" y1="200" x2="450" y2="200" stroke={primaryBlue} strokeWidth="3" strokeDasharray="none" />
      </g>

      {/* Left Side: The Candidate Node */}
      <g transform="translate(150, 200)">
        <circle r="40" fill={lightBlueBg} opacity="0.7" />
        <circle r="25" fill={primaryBlue} />
        {/* User Icon */}
        <svg x="-12" y="-12" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
         {/* Floating data points */}
         <circle r="6" cx="-40" cy="-30" fill={mutedBlue} />
         <circle r="4" cx="-30" cy="40" fill={mutedBlue} />
      </g>

      {/* Right Side: The Internship Target Node */}
      <g transform="translate(450, 200)">
         <circle r="40" fill={lightBlueBg} opacity="0.7" />
        <circle r="25" fill={primaryBlue} />
        {/* Briefcase Icon */}
        <svg x="-12" y="-12" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </g>

      {/* Center: The Match Indicator */}
      <g transform="translate(300, 200)">
         <circle r="20" fill={white} stroke={primaryBlue} strokeWidth="3"/>
         {/* Checkmark icon */}
         <svg x="-10" y="-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={primaryBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
         </svg>
      </g>
    </svg>
  );
};

export default HeroIllustration;