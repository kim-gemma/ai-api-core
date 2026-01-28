'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResult(data.answer);
  };

  return (
    <div className="p-8">
      <input
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문 입력"
      />
      <button
        className="mt-4 px-4 py-2 bg-black text-white"
        onClick={handleClick}
      >
        보내기
      </button>

      <div className="mt-6">
        결과: {result}
      </div>
    </div>
  );
}
