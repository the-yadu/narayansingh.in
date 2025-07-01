import React, { useState } from 'react';

const diceFaces = [
  // Unicode dice faces 1-6
  '\u2680', // ⚀
  '\u2681', // ⚁
  '\u2682', // ⚂
  '\u2683', // ⚃
  '\u2684', // ⚄
  '\u2685', // ⚅
];

const getRandomFace = () => Math.floor(Math.random() * 6);

const DiceRoller: React.FC = () => {
  const [rolling, setRolling] = useState(false);
  const [face, setFace] = useState(getRandomFace());

  const rollDice = () => {
    setRolling(true);
    let rollCount = 0;
    const maxRolls = 15 + Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      setFace(getRandomFace());
      rollCount++;
      if (rollCount > maxRolls) {
        clearInterval(interval);
        setRolling(false);
        setFace(getRandomFace());
      }
    }, 60);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className={`text-[7rem] md:text-[10rem] transition-transform duration-200 ${rolling ? 'animate-spin-slow' : ''}`}
        style={{ fontFamily: 'Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif' }}
        aria-label={`Dice face ${face + 1}`}
      >
        {String.fromCodePoint(0x2680 + face)}
      </div>
      <button
        onClick={rollDice}
        disabled={rolling}
        className="px-8 py-3 rounded-full bg-green-600 text-white text-xl font-bold shadow hover:bg-green-700 transition disabled:opacity-60"
        aria-label="Roll the dice"
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;
