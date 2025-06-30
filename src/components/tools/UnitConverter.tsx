import React, { useState } from 'react';

type Unit = 'length' | 'weight' | 'temperature';

const units = {
  length: [
    { label: 'Meters', value: 'm' },
    { label: 'Kilometers', value: 'km' },
    { label: 'Miles', value: 'mi' },
    { label: 'Feet', value: 'ft' },
  ],
  weight: [
    { label: 'Grams', value: 'g' },
    { label: 'Kilograms', value: 'kg' },
    { label: 'Pounds', value: 'lb' },
    { label: 'Ounces', value: 'oz' },
  ],
  temperature: [
    { label: 'Celsius', value: 'c' },
    { label: 'Fahrenheit', value: 'f' },
    { label: 'Kelvin', value: 'k' },
  ],
};

function convert(value: number, from: string, to: string, type: Unit): number {
  if (type === 'length') {
    // Convert to meters first
    let meters = value;
    if (from === 'km') meters *= 1000;
    if (from === 'mi') meters *= 1609.34;
    if (from === 'ft') meters *= 0.3048;
    if (from === 'm') meters = value;
    // Convert meters to target
    if (to === 'km') return meters / 1000;
    if (to === 'mi') return meters / 1609.34;
    if (to === 'ft') return meters / 0.3048;
    return meters;
  }
  if (type === 'weight') {
    // Convert to grams first
    let grams = value;
    if (from === 'kg') grams *= 1000;
    if (from === 'lb') grams *= 453.592;
    if (from === 'oz') grams *= 28.3495;
    if (from === 'g') grams = value;
    // Convert grams to target
    if (to === 'kg') return grams / 1000;
    if (to === 'lb') return grams / 453.592;
    if (to === 'oz') return grams / 28.3495;
    return grams;
  }
  if (type === 'temperature') {
    if (from === to) return value;
    // Celsius to others
    if (from === 'c') {
      if (to === 'f') return value * 9/5 + 32;
      if (to === 'k') return value + 273.15;
    }
    // Fahrenheit to others
    if (from === 'f') {
      if (to === 'c') return (value - 32) * 5/9;
      if (to === 'k') return (value - 32) * 5/9 + 273.15;
    }
    // Kelvin to others
    if (from === 'k') {
      if (to === 'c') return value - 273.15;
      if (to === 'f') return (value - 273.15) * 9/5 + 32;
    }
  }
  return value;
}

const UnitConverter: React.FC = () => {
  const [type, setType] = useState<Unit>('length');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');
  const [input, setInput] = useState('1');

  const result = (() => {
    const val = parseFloat(input);
    if (isNaN(val)) return '';
    return convert(val, from, to, type).toLocaleString(undefined, { maximumFractionDigits: 6 });
  })();

  React.useEffect(() => {
    setFrom(units[type][0].value);
    setTo(units[type][1].value);
  }, [type]);

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <div className="flex gap-2 mb-2">
        <label className="font-medium text-gray-700">Type:</label>
        <select className="rounded border px-2 py-1" value={type} onChange={e => setType(e.target.value as Unit)}>
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <input
          className="w-32 rounded-lg border border-gray-300 px-3 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          type="number"
        />
        <select className="rounded border px-2 py-1" value={from} onChange={e => setFrom(e.target.value)}>
          {units[type].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
        <span className="mx-2 text-gray-500">→</span>
        <input
          className="w-32 rounded-lg border border-gray-200 px-3 py-2 font-mono text-gray-800 bg-gray-50"
          value={result}
          readOnly
        />
        <select className="rounded border px-2 py-1" value={to} onChange={e => setTo(e.target.value)}>
          {units[type].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
      </div>
    </div>
  );
};

export default UnitConverter;
