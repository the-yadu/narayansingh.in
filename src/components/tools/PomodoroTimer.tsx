import React, { useState, useRef } from 'react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function start() {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s > 0) return s - 1;
        setMinutes(m => {
          if (m > 0) {
            setSeconds(59);
            return m - 1;
          } else {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setMode(mode === 'work' ? 'break' : 'work');
            setMinutes(mode === 'work' ? 5 : 25);
            setSeconds(0);
            return mode === 'work' ? 5 : 25;
          }
        });
        return 0;
      });
    }, 1000);
  }

  function stop() {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function reset() {
    stop();
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  }

  React.useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4 items-center">
      <div className="text-lg font-semibold text-gray-700 mb-2">{mode === 'work' ? 'Work' : 'Break'} Session</div>
      <div className="text-5xl font-mono text-green-700 mb-4">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition" onClick={start} disabled={running}>Start</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={stop} disabled={!running}>Stop</button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition" onClick={reset}>Reset</button>
      </div>
      <div className="text-xs text-gray-400 mt-2">25 min work, 5 min break. Auto-switches mode.</div>
    </div>
  );
};

export default PomodoroTimer;
