'use client';

import { getTelegramMessages } from '@/services/telegram';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface Message {
  name: string;
  message: string;
  content: string;
  photo: MessagePhoto | null;
  date: number;
  sender: string;
  id: string;
  img_message: string | null;
  timestamp: string;
}

interface BufferData {
  type: string;
  data: number[];
}

interface PhotoSize {
  type: string;
  w?: number;
  h?: number;
  size?: number;
  bytes?: BufferData;
  sizes?: number[];
  className: string;
  id: string;
}

interface FileReference {
  type: string;
  data: number[];
}

interface MessagePhoto {
  flags: number;
  hasStickers: boolean;
  id: string;
  accessHash: string;
  fileReference: FileReference;
  date: number;
  sizes: PhotoSize[];
  videoSizes: null;
  dcId: number;
  className: string;
}

function bufferToBase64(buffer: number[]) {
  const binary = buffer.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ''
  );
  return btoa(binary);
}

export default function MessageList({ groupId }: { groupId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (page: number) => {
    if (!groupId) return;
    try {
      const response = await getTelegramMessages(groupId, page);

      const formattedMessages = response.map((msg: any) => ({
        id: msg.id,
        content: msg.message,
        sender: msg.isMeSend ? 'user' : 'other',
        name: msg.name,
        timestamp: new Date(msg.date * 1000).toLocaleString(),
        type: msg.photo ? 'image' : 'text',
        photo: msg.photo || null,
        img_message: msg.photo
          ? bufferToBase64(msg.photo.sizes[0].bytes.data)
          : null
      }));
      console.log(formattedMessages);
      setMessages((prevMessages) => [
        ...formattedMessages.reverse(),
        ...prevMessages
      ]);
      setHasMore(response.length > 0);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [groupId, page]);

  useEffect(scrollToBottom, [messages]);

  const loadMoreMessages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='flex-1 overflow-y-auto p-4 bg-gray-800 text-white'>
      {hasMore && (
        <button
          onClick={loadMoreMessages}
          className='mb-4 p-2 bg-blue-500 text-white rounded-lg'
        >
          Load More
        </button>
      )}
      {messages.map((message, index) => (
        <div
          key={`${message.id}-${index}`}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
        >
          <div
            className={`max-w-[70%] ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-white'
            } rounded-lg p-3`}
          >
            <p className='text-xs text-gray-400 mb-1'>{message.name}</p>
            {message.img_message ? (
              <Image
                src={`data:image/png;base64,${message.img_message}`}
                alt='Photo'
                width={100}
                height={100}
                className='rounded-lg'
              />
            ) : null}
            <p>{message.content}</p>
            <p className='text-xs mt-1 text-gray-400'>{message.timestamp}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
