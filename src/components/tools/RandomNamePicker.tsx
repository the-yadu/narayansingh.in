import React, { useState } from 'react';

const RandomNamePicker: React.FC = () => {
  const [names, setNames] = useState<string>('');
  const [picked, setPicked] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  function pickRandom() {
    const arr = names
      .split(/\r?\n|,|;/)
      .map(n => n.trim())
      .filter(Boolean);
    if (arr.length === 0) return;
    const available = arr.filter(n => !history.includes(n));
    if (available.length === 0) {
      setHistory([]);
      setPicked(null);
      return;
    }
    const idx = Math.floor(Math.random() * available.length);
    const name = available[idx];
    setPicked(name);
    setHistory([...history, name]);
  }

  function reset() {
    setPicked(null);
    setHistory([]);
  }

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <label className="font-medium text-gray-700">Enter names (comma, semicolon, or new line separated):</label>
      <textarea
        className="w-full min-h-[80px] rounded-lg border border-gray-300 px-3 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
        value={names}
        onChange={e => setNames(e.target.value)}
        placeholder="Alice, Bob, Charlie\nDavid\nEve"
      />
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          onClick={pickRandom}
          disabled={!names.trim()}
        >
          Pick Random
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      {picked && (
        <div className="mt-4 text-center">
          <div className="text-lg text-gray-500">Picked:</div>
          <div className="text-2xl font-bold text-green-700 mt-1">{picked}</div>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-center">Picked so far: {history.join(', ')}</div>
      )}
    </div>
  );
};

export default RandomNamePicker;
