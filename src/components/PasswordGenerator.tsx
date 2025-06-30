import React, { useState } from 'react';

interface Options {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function generatePassword(length: number, opts: Options): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';
  let chars = '';
  if (opts.uppercase) chars += upper;
  if (opts.lowercase) chars += lower;
  if (opts.numbers) chars += numbers;
  if (opts.symbols) chars += symbols;
  if (!chars) return '';
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(14);
  const [opts, setOpts] = useState<Options>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState<string>(() => generatePassword(length, opts));
  const [copied, setCopied] = useState<boolean>(false);

  function updatePassword(newOpts = opts, newLength = length) {
    setPassword(generatePassword(newLength, newOpts));
    setCopied(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleOptChange(opt: keyof Options) {
    const newOpts = { ...opts, [opt]: !opts[opt] };
    setOpts(newOpts);
    updatePassword(newOpts);
  }

  function handleLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newLength = Number(e.target.value);
    setLength(newLength);
    updatePassword(opts, newLength);
  }

  return (
    <section className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
        <span role="img" aria-label="key">🔑</span> Password Generator
      </h2>
      <div className="flex items-center gap-2 mb-6">
        <input
          className="w-full text-lg font-mono bg-gray-100 rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={password}
          readOnly
          aria-label="Generated password"
        />
        <button
          className={`ml-2 px-3 py-2 rounded-lg font-medium transition text-white ${copied ? 'bg-green-500' : 'bg-gray-900 hover:bg-gray-700'}`}
          onClick={handleCopy}
          aria-label="Copy password"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          className="ml-1 text-gray-400 hover:text-gray-900 text-xl transition"
          onClick={() => updatePassword()}
          title="Regenerate password"
          aria-label="Regenerate password"
        >
          &#x21bb;
        </button>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1 text-gray-700" htmlFor="length-slider">Password Length</label>
        <input
          id="length-slider"
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={handleLengthChange}
          className="w-full accent-green-600"
        />
        <div className="text-center text-sm mt-1 text-gray-600">{length} characters</div>
      </div>
      <fieldset className="flex flex-wrap gap-4 mb-2" aria-label="Password options">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.uppercase} onChange={() => handleOptChange('uppercase')} />
          <span className="text-gray-700">Uppercase</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.lowercase} onChange={() => handleOptChange('lowercase')} />
          <span className="text-gray-700">Lowercase</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.numbers} onChange={() => handleOptChange('numbers')} />
          <span className="text-gray-700">Numbers</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={opts.symbols} onChange={() => handleOptChange('symbols')} />
          <span className="text-gray-700">Symbols</span>
        </label>
      </fieldset>
      <p className="text-xs text-gray-500 mt-4">Tip: Use at least 3 character types for a strong password.</p>
    </section>
  );
};

export default PasswordGenerator;
