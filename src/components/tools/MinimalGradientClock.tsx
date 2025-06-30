import React, { useEffect, useRef } from 'react';

const size = 320;
const center = size / 2;
const radius = center - 18;

function getHandCoords(length: number, angle: number) {
  const rad = (Math.PI / 180) * angle;
  return {
    x: center + length * Math.sin(rad),
    y: center - length * Math.cos(rad),
  };
}

const MinimalGradientClock: React.FC = () => {
  const [now, setNow] = React.useState(new Date());
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    function animate() {
      setNow(new Date());
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const ms = now.getMilliseconds();

  // Angles
  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = (second + ms / 1000) * 6;

  // Hand lengths
  const hourLen = radius * 0.45;
  const minLen = radius * 0.7;
  const secLen = radius * 0.85;

  // Hands
  const hourHand = getHandCoords(hourLen, hourAngle);
  const minHand = getHandCoords(minLen, minuteAngle);
  const secHand = getHandCoords(secLen, secondAngle);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        <defs>
          <radialGradient id="clock-bg" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </radialGradient>
          <linearGradient id="sec-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="url(#clock-bg)" stroke="#e5e7eb" strokeWidth="8" />
        {/* Hour hand */}
        <line x1={center} y1={center} x2={hourHand.x} y2={hourHand.y} stroke="#222" strokeWidth={7} strokeLinecap="round" />
        {/* Minute hand */}
        <line x1={center} y1={center} x2={minHand.x} y2={minHand.y} stroke="#222" strokeWidth={4} strokeLinecap="round" />
        {/* Second hand with gradient */}
        <line x1={center} y1={center} x2={secHand.x} y2={secHand.y} stroke="url(#sec-gradient)" strokeWidth={2.5} strokeLinecap="round" />
        {/* Center dot */}
        <circle cx={center} cy={center} r={8} fill="#222" />
        <circle cx={center} cy={center} r={4} fill="#fff" />
      </svg>
      <div className="mt-6 text-2xl font-mono text-gray-700 tracking-widest">
        {now.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MinimalGradientClock;
