'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: string
  type: 'text' | 'image'
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Who was that philosopher you shared with me recently?',
    sender: 'user',
    timestamp: '2:14 PM',
    type: 'text',
  },
  {
    id: '2',
    content: 'Roland Barthes',
    sender: 'other',
    timestamp: '2:16 PM',
    type: 'text',
  },
  {
    id: '3',
    content: "That's him!",
    sender: 'user',
    timestamp: '2:16 PM',
    type: 'text',
  },
  {
    id: '4',
    content: 'What was his vision statement?',
    sender: 'user',
    timestamp: '2:18 PM',
    type: 'text',
  },
  {
    id: '5',
    content: '"Ultimately in order to see a photograph well, it is best to look away or close your eyes."',
    sender: 'other',
    timestamp: '2:20 PM',
    type: 'text',
  },
  {
    id: '6',
    content: '/images/aerial-photo.jpg',
    sender: 'other',
    timestamp: '2:20 PM',
    type: 'image',
  },
  // Add more messages here...
]

export default function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-800 text-white">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div className={`max-w-[70%] ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'} rounded-lg p-3`}>
            {message.type === 'text' ? (
              <p>{message.content}</p>
            ) : (
              <div className="relative w-full h-48">
                {/* <Image
                  src={message.content}
                  alt="Shared image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                /> */}
              </div>
            )}
            <p className="text-xs mt-1 text-gray-400">{message.timestamp}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}