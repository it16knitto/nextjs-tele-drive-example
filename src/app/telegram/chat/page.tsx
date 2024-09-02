import ChatArea from '@/components/telegram/chat-area';
import Layout from '@/components/telegram/layout';
import Sidebar from '@/components/telegram/sidebar';

export default function Telegram() {
  return (
    <Layout>
      <Sidebar />
      <ChatArea />
    </Layout>
  );
}
