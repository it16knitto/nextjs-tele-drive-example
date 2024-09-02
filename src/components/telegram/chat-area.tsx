'use client';
import ChatAreaEmpty from './chat-area-empty';
import InputArea from './input-area';
import MessageList from './message-list';
import { useSearchParams } from 'next/navigation';

function useGroupIdFromQuery() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');
  return groupId as string;
}

export default function ChatArea() {
  const groupId = useGroupIdFromQuery();

  return (
    <div className='flex-1 flex flex-col bg-gray-900 text-white'>
      <div className='p-4 border-b border-gray-700'>
        <h2 className='text-xl font-semibold'>Chat Title</h2>
      </div>

      {!groupId ? (
        <ChatAreaEmpty />
      ) : (
        <>
          <MessageList groupId={groupId} />
          <InputArea />
        </>
      )}
    </div>
  );
}
