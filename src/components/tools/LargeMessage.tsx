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
  const [shareStatus, setShareStatus] = useState<string>('');
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

  // Share button handler
  function handleShare() {
    if (typeof window === 'undefined') return;
    // Prefer Web Share API on mobile
    if (navigator.share && /Mobi|Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent)) {
      navigator.share({
        title: 'You have a new message! Click to reveal',
        text: 'Someone sent you a large message. Open the link to see it in big, beautiful type!',
        url: window.location.href,
      }).catch(() => {
        // fallback to clipboard if user cancels or share fails
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            setShareStatus('Copied!');
            setTimeout(() => setShareStatus(''), 1500);
          })
          .catch(() => {
            setShareStatus('Failed to copy');
            setTimeout(() => setShareStatus(''), 1500);
          });
      });
      return;
    }
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShareStatus('Copied!');
        setTimeout(() => setShareStatus(''), 1500);
      })
      .catch(() => {
        setShareStatus('Failed to copy');
        setTimeout(() => setShareStatus(''), 1500);
      });
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
        <label htmlFor="base64-mode" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
          Use base64-encoded URL (for privacy)
        </label>
      </div>
      <div className="w-full max-w-xl mb-2">
        <input
          ref={inputRef}
          className="w-full text-2xl px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Type your message and press Enter..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Large message input"
        />
      </div>
      <div className="flex w-full max-w-xl gap-2 mb-4">
        <button
          type="button"
          onClick={() => setText('')}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          aria-label="Clear message"
          title="Clear"
          disabled={!text}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block align-text-bottom mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-1"
          aria-label="Share message link"
          title="Copy shareable link to clipboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3v12m-6 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Share</span>
        </button>
        {shareStatus && (
          <span className="ml-2 text-green-600 text-sm self-center">{shareStatus}</span>
        )}
      </div>
      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="w-full min-h-[30vh] sm:min-h-[40vh] flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow text-gray-900 dark:text-white text-3xl sm:text-5xl md:text-7xl font-black text-center break-words p-4 sm:p-8 select-all transition-all whitespace-normal"
          tabIndex={-1}
          aria-live="polite"
          style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
        >
          {text ? (
            <span style={{ display: 'inline-block', whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {text}
            </span>
          ) : (
            <span className="text-gray-300 dark:text-gray-500 font-bold">Your message will appear here</span>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
        Press <span className="font-semibold">Enter</span> to go full screen.<br />
        The URL updates as you type and can be shared.<br />
        <span className="font-semibold">Base64 mode</span> hides your message in the URL.<br />
        Click or select the text to copy.
      </div>
    </div>
  );
};

export default LargeMessage;
