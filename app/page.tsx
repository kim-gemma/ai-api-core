'use client';

import { useState } from 'react';

type ChatItem = {
  question: string;
  answer: string;
};

export default function Home() {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!input.trim()) return;

    const question = input;
    setLoading(true);

    setChats((prev) => [
      ...prev,
      { question, answer: '답변 생성 중...' },
    ]);

    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();

      setChats((prev) =>
        prev.map((chat, idx) =>
          idx === prev.length - 1
            ? { ...chat, answer: data.answer }
            : chat
        )
      );
    } catch {
      setChats((prev) =>
        prev.map((chat, idx) =>
          idx === prev.length - 1
            ? { ...chat, answer: '에러가 발생했어요.' }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };


  return (
     <div className="p-8 max-w-2xl mx-auto">
      <input
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문 입력"
      />

      <button
        className="mt-4 px-4 py-2 bg-black text-white"
        onClick={handleClick}
        disabled={loading}
      >
        보내기
      </button>

      <div className="mt-6 space-y-4">
        {chats.map((chat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-right">
              <div className="inline-block bg-black text-white px-3 py-2 rounded-lg">
                {chat.question}
              </div>
            </div>
            <div className="text-left">
              <div className="inline-block bg-gray-100 px-3 py-2 rounded-lg">
                {chat.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
