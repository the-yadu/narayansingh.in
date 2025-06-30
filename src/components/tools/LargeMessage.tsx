import React, { useState, useRef, useEffect } from 'react';

function getTextFromUrl(base64Mode: boolean): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const val = params.get('text') || '';
  if (base64Mode && val) {
    try {
      return atob(val);
    } catch {
      return '';
    }
  }
  return val;
}

function encodeText(text: string, base64Mode: boolean): string {
  return base64Mode && text ? btoa(text) : text;
}

const LargeMessage: React.FC = () => {
  const [base64Mode, setBase64Mode] = useState(false);
  const [text, setText] = useState<string>(() => getTextFromUrl(false));
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // On mount, check if base64 param is set
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const isBase64 = params.get('base64') === '1';
    setBase64Mode(isBase64);
    setText(getTextFromUrl(isBase64));
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update URL as user types or toggles mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (text) {
      params.set('text', encodeText(text, base64Mode));
    } else {
      params.delete('text');
    }
    if (base64Mode) {
      params.set('base64', '1');
    } else {
      params.delete('base64');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [text, base64Mode]);

  // Allow pressing Enter to go full screen
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && displayRef.current) {
      if (displayRef.current.requestFullscreen) {
        displayRef.current.requestFullscreen();
      }
    }
  }

  function handleModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBase64Mode(e.target.checked);
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex items-center gap-4 mb-2">
        <input
          type="checkbox"
          id="base64-mode"
          checked={base64Mode}
          onChange={handleModeChange}
        />
        <label htmlFor="base64-mode" className="text-sm text-gray-700 cursor-pointer select-none">
          Use base64-encoded URL (for privacy)
        </label>
      </div>
      <input
        ref={inputRef}
        className="w-full max-w-xl text-2xl px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow mb-4"
        placeholder="Type your message and press Enter..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Large message input"
      />
      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Maximise"
          aria-label="Maximise"
          onClick={() => {
            if (displayRef.current && displayRef.current.requestFullscreen) {
              displayRef.current.requestFullscreen();
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-8 0H6a2 2 0 01-2-2v-2" />
          </svg>
        </button>
        <div
          ref={displayRef}
          className="w-full min-h-[40vh] flex items-center justify-center bg-white rounded-2xl border border-gray-200 shadow text-gray-900 text-5xl md:text-7xl font-black text-center break-words p-8 select-all transition-all"
          tabIndex={-1}
          aria-live="polite"
        >
          {text || <span className="text-gray-300 font-bold">Your message will appear here</span>}
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Press <span className="font-semibold">Enter</span> to go full screen.<br />
        The URL updates as you type and can be shared.<br />
        <span className="font-semibold">Base64 mode</span> hides your message in the URL.<br />
        Click or select the text to copy.
      </div>
    </div>
  );
};

export default LargeMessage;
