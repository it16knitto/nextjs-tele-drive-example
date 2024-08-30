'use client'

import { useState } from 'react'
import { FiSmile, FiPaperclip, FiSend } from 'react-icons/fi'

export default function InputArea() {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement send functionality
      setMessage('')
    }
  }

  return (
    <div className="border-t border-gray-700 p-3 flex items-center bg-gray-900">
      <button className="text-gray-400 hover:text-gray-200 mr-2">
        <FiSmile size={24} />
      </button>
      <button className="text-gray-400 hover:text-gray-200 mr-2">
        <FiPaperclip size={24} />
      </button>
      <input
        type="text"
        placeholder="Type your message"
        className="flex-1 border border-gray-600 bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSend()
        }}
      />
      <button
        className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSend}
      >
        <FiSend size={20} />
      </button>
    </div>
  )
}