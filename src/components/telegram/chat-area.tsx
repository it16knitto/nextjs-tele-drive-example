import InputArea from './input-area'
import MessageList from './message-list'

export default function ChatArea() {
  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Chat Title</h2>
      </div>
      <MessageList />
      <InputArea />
    </div>
  )
}