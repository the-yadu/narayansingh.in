import React, { useState } from 'react';

function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

const ColorPaletteGenerator: React.FC = () => {
  const [palette, setPalette] = useState<string[]>(() => Array.from({ length: 5 }, getRandomColor));

  function regenerate() {
    setPalette(Array.from({ length: 5 }, getRandomColor));
  }

  function copyColor(color: string) {
    navigator.clipboard.writeText(color);
  }

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-6">
      <div className="flex gap-2 justify-between mb-2">
        <span className="font-medium text-gray-700">Color Palette</span>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-green-700 transition text-sm"
          onClick={regenerate}
        >
          Regenerate
        </button>
      </div>
      <div className="flex gap-4 justify-center">
        {palette.map((color, i) => (
          <div key={color} className="flex flex-col items-center group">
            <div
              className="w-16 h-16 rounded-lg shadow border border-gray-200 cursor-pointer transition hover:scale-105"
              style={{ background: color }}
              title="Copy color"
              onClick={() => copyColor(color)}
            />
            <span className="mt-2 text-xs font-mono text-gray-700 group-hover:underline cursor-pointer" onClick={() => copyColor(color)}>{color}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-center">Click a color or code to copy</div>
    </div>
  );
};

export default ColorPaletteGenerator;
