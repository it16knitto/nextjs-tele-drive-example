'use client'
import { useState } from 'react';
import Image from 'next/image';

const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    {!isUser && (
      <Image
        src="/user-avatar.png"
        alt="User Avatar"
        className="w-8 h-8 rounded-full mr-2"
        width={32}
        height={32}
      />
    )}
    <div className={`p-2 m-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
      {message}
    </div>
    {isUser && (
      <Image
        src="/user-avatar.png"
        alt="User Avatar"
        className="w-8 h-8 rounded-full ml-2"
        width={32}
        height={32}
      />
    )}
  </div>
);

const ChatDialog = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', isUser: false },
    { text: 'Hi there!', isUser: true },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDialog;