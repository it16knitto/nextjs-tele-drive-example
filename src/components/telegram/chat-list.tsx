'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getTelegramListChatsGroups } from '@/services/telegram';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getTelegramListChatsGroups();
        const formattedChats = response.map((chat: any) => ({
          id: chat.id,
          name: chat.title,
          lastMessage: chat.lastMessage ? chat.lastMessage.slice(0, 32) : '',
          timestamp: new Date(chat.timestamp * 1000).toLocaleTimeString(),
          unreadCount: chat.membersCount
        }));
        setChats(formattedChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className='overflow-y-auto bg-gray-900 text-white h-full p-2'>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className='flex items-center p-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer'
        >
          <div className='flex-1'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold text-sm'>{chat.name}</h3>
              <span className='text-xs text-gray-400'>{chat.timestamp}</span>
            </div>
            <p className='text-xs text-gray-500 truncate'>{chat.lastMessage}</p>
          </div>
          {chat.unreadCount && (
            <div className='ml-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
              {chat.unreadCount > 1000
                ? `${(chat.unreadCount / 1000).toFixed(1)}k`
                : chat.unreadCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
