import React, { useState } from 'react';

const SimpleCalculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleButton(val: string) {
    setInput(input + val);
    setError(null);
  }

  function handleClear() {
    setInput('');
    setResult(null);
    setError(null);
  }

  function handleEquals() {
    try {
      // eslint-disable-next-line no-eval
      const res = eval(input);
      setResult(res.toString());
      setError(null);
    } catch {
      setError('Invalid expression');
      setResult(null);
    }
  }

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4 max-w-xs mx-auto">
      <div className="mb-2">
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-lg text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
          value={input}
          readOnly
          placeholder="0"
        />
        {result !== null && <div className="text-right text-green-700 font-bold text-lg mt-1">= {result}</div>}
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[7,8,9,'/'].map(val => <button key={val} className="btn" onClick={() => handleButton(val.toString())}>{val}</button>)}
        {[4,5,6,'*'].map(val => <button key={val} className="btn" onClick={() => handleButton(val.toString())}>{val}</button>)}
        {[1,2,3,'-'].map(val => <button key={val} className="btn" onClick={() => handleButton(val.toString())}>{val}</button>)}
        {[0,'.','=','+'].map(val => val === '=' ? (
          <button key={val} className="btn bg-green-600 text-white hover:bg-green-700" onClick={handleEquals}>=</button>
        ) : (
          <button key={val} className="btn" onClick={() => handleButton(val.toString())}>{val}</button>
        ))}
      </div>
      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition mt-2" onClick={handleClear}>Clear</button>
      <style>{`.btn { background: #f3f4f6; border-radius: 0.5rem; padding: 0.75rem 0; font-size: 1.1rem; font-weight: 500; color: #374151; border: none; transition: background 0.2s; } .btn:hover { background: #e5e7eb; }`}</style>
    </div>
  );
};

export default SimpleCalculator;
