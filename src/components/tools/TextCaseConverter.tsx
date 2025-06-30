import React, { useState } from 'react';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const TextCaseConverter: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <label className="font-medium text-gray-700">Enter text:</label>
      <textarea
        className="w-full min-h-[80px] rounded-lg border border-gray-300 px-3 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-gray-700 mb-1">UPPERCASE</div>
          <div className="bg-gray-50 rounded p-2 font-mono text-gray-800 border border-gray-100 min-h-[40px]">{input.toUpperCase()}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">lowercase</div>
          <div className="bg-gray-50 rounded p-2 font-mono text-gray-800 border border-gray-100 min-h-[40px]">{input.toLowerCase()}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">Title Case</div>
          <div className="bg-gray-50 rounded p-2 font-mono text-gray-800 border border-gray-100 min-h-[40px]">{toTitleCase(input)}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-700 mb-1">snake_case</div>
          <div className="bg-gray-50 rounded p-2 font-mono text-gray-800 border border-gray-100 min-h-[40px]">{input.replace(/\s+/g, '_').toLowerCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default TextCaseConverter;
