import React, { useState, useRef, useEffect } from 'react';

const LargeType: React.FC = () => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Allow pressing Enter to go full screen
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && displayRef.current) {
      if (displayRef.current.requestFullscreen) {
        displayRef.current.requestFullscreen();
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <input
        ref={inputRef}
        className="w-full max-w-xl text-2xl px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow mb-4"
        placeholder="Type your message and press Enter..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Large type input"
      />
      <div
        ref={displayRef}
        className="w-full min-h-[40vh] flex items-center justify-center bg-white rounded-2xl border border-gray-200 shadow text-gray-900 text-5xl md:text-7xl font-black text-center break-words p-8 select-all transition-all"
        tabIndex={-1}
        aria-live="polite"
      >
        {text || <span className="text-gray-300 font-bold">Your text will appear here</span>}
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Press <span className="font-semibold">Enter</span> to go full screen.<br />
        Click or select the text to copy.
      </div>
    </div>
  );
};

export default LargeType;
