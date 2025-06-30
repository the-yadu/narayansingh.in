import React, { useEffect, useRef } from 'react';

const size = 320;
const center = size / 2;
const radius = center - 16;

function getHandCoords(length: number, angle: number) {
  const rad = (Math.PI / 180) * angle;
  return {
    x: center + length * Math.sin(rad),
    y: center - length * Math.cos(rad),
  };
}

const SmartisanClock: React.FC = () => {
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
  const hourLen = radius * 0.5;
  const minLen = radius * 0.75;
  const secLen = radius * 0.85;

  // Ticks
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6) * (Math.PI / 180);
    const len = i % 5 === 0 ? 12 : 5;
    return (
      <line
        key={i}
        x1={center + (radius - len) * Math.sin(angle)}
        y1={center - (radius - len) * Math.cos(angle)}
        x2={center + radius * Math.sin(angle)}
        y2={center - radius * Math.cos(angle)}
        stroke={i % 5 === 0 ? '#222' : '#bbb'}
        strokeWidth={i % 5 === 0 ? 2 : 1}
      />
    );
  });

  // Numbers
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const angle = ((i + 1) * 30) * (Math.PI / 180);
    const r = radius - 32;
    return (
      <text
        key={i}
        x={center + r * Math.sin(angle)}
        y={center - r * Math.cos(angle) + 8}
        textAnchor="middle"
        fontSize="1.25rem"
        fill="#222"
        fontWeight="bold"
        fontFamily="inherit"
      >
        {i + 1}
      </text>
    );
  });

  // Hands
  const hourHand = getHandCoords(hourLen, hourAngle);
  const minHand = getHandCoords(minLen, minuteAngle);
  const secHand = getHandCoords(secLen, secondAngle);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
        <circle cx={center} cy={center} r={radius} fill="#fff" stroke="#e5e7eb" strokeWidth="8" />
        {ticks}
        {numbers}
        {/* Hour hand */}
        <line x1={center} y1={center} x2={hourHand.x} y2={hourHand.y} stroke="#222" strokeWidth={7} strokeLinecap="round" />
        {/* Minute hand */}
        <line x1={center} y1={center} x2={minHand.x} y2={minHand.y} stroke="#222" strokeWidth={4} strokeLinecap="round" />
        {/* Second hand */}
        <line x1={center} y1={center} x2={secHand.x} y2={secHand.y} stroke="#e53e3e" strokeWidth={2} strokeLinecap="round" />
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

export default SmartisanClock;
