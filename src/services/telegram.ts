import axiosInstance from '../http/axios';
export const getTelegramListChatsGroups = async () => {
  try {
    const response = await axiosInstance.get('telegram/group/list');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Telegram group list:', error);
    throw error;
  }
};
export const getTelegramMessages = async (groupId: string, page: number) => {
  try {
    const response = await axiosInstance.get(
      `/telegram/group/${groupId}/messages?page=${page}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Telegram messages:', error);
    throw error;
  }
};
export const sendTelegramMessage = async (groupId: string, message: string) => {
  try {
    const response = await axiosInstance.post(
      `/telegram/group/${groupId}/send-message`,
      { message }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};
export const deleteTelegramMessage = async (
  groupId: string,
  messageId: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/telegram/group/${groupId}/delete-message/${messageId}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error deleting Telegram message:', error);
  }
};
export const editTelegramMessage = async (
  groupId: string,
  messageId: string,
  newContent: string
) => {
  try {
    const response = await axiosInstance.put(
      `/telegram/group/${groupId}/edit-message/${messageId}`,
      { newContent }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error editing Telegram message:', error);
    throw error;
  }
};
