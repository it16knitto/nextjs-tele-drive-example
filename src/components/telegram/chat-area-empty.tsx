export default function ChatAreaEmpty() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-gray-900 text-white'>
      <div className='p-4 border-b border-gray-700'>
        <h2 className='text-xl font-semibold'>No Chats Available</h2>
      </div>
      <p className='text-gray-500'>
        Start a new conversation to see your messages here.
      </p>
    </div>
  );
}
