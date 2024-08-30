import ChatList from './chat-list'

export default function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-800 border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <input type="text" placeholder="Search" className="w-full p-2 border rounded bg-gray-900 text-white placeholder-gray-500" />
      </div>
      <ChatList />
    </div>
  )
}