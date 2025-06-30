import React, { useState } from 'react';

const names = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
  'Mallory', 'Niaj', 'Olivia', 'Peggy', 'Sybil', 'Trent', 'Victor', 'Walter', 'Yvonne', 'Zara'
];

function randomEmail() {
  const name = names[Math.floor(Math.random() * names.length)].toLowerCase();
  const domain = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'][Math.floor(Math.random() * 4)];
  return `${name}${Math.floor(Math.random() * 100)}@${domain}`;
}

function randomAddress() {
  return `${Math.floor(Math.random() * 9999)} Main St, City ${Math.floor(Math.random() * 100)}, Country`;
}

const FakeDataGenerator: React.FC = () => {
  const [type, setType] = useState<'name' | 'email' | 'address'>('name');
  const [value, setValue] = useState('');

  function generate() {
    if (type === 'name') setValue(names[Math.floor(Math.random() * names.length)]);
    if (type === 'email') setValue(randomEmail());
    if (type === 'address') setValue(randomAddress());
  }

  function copy() {
    navigator.clipboard.writeText(value);
  }

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <div className="flex gap-2 mb-2">
        <label className="font-medium text-gray-700">Type:</label>
        <select className="rounded border px-2 py-1" value={type} onChange={e => setType(e.target.value as any)}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="address">Address</option>
        </select>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-fit" onClick={generate}>Generate</button>
      {value && (
        <div className="flex items-center gap-2 mt-2">
          <span className="font-mono text-lg text-gray-800 bg-gray-100 px-3 py-1 rounded">{value}</span>
          <button className="text-green-700 text-xs hover:underline" onClick={copy}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default FakeDataGenerator;
