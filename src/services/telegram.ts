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
