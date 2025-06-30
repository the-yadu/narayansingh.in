import React, { useState } from 'react';
// We'll use a lightweight QR code library
import QRCode from 'qrcode';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [qr, setQr] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    try {
      const url = await QRCode.toDataURL(text || ' ');
      setQr(url);
      setError(null);
    } catch (e) {
      setError('Failed to generate QR code.');
    }
  }

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <label className="font-medium text-gray-700">Enter text or URL:</label>
      <input
        className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="https://example.com"
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-fit"
        onClick={generate}
        disabled={!text.trim()}
      >
        Generate QR Code
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {qr && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <img src={qr} alt="QR Code" className="w-40 h-40 bg-white rounded shadow border" />
          <a href={qr} download="qrcode.png" className="text-green-700 text-xs hover:underline">Download PNG</a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
