import React, { useState } from 'react';
import { marked } from 'marked';

const MarkdownPreviewer: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  return (
    <div className="bg-white/90 rounded-xl shadow p-6 border border-gray-200 flex flex-col gap-4">
      <label className="font-medium text-gray-700">Markdown Input:</label>
      <textarea
        className="w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
        placeholder={"# Hello World\nType some *Markdown* here!"}
      />
      <div>
        <span className="font-medium text-gray-700">Preview:</span>
        <div className="prose prose-green max-w-none bg-gray-50 rounded-lg p-4 mt-2 border border-gray-100 min-h-[80px]" dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
