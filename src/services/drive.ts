import axiosInstance from '../http/axios';

export const fetchGoogleDriveFileAndFolders = async (folder_id?: string) => {
  try {
    const response = await axiosInstance.get(
      '/google-drive/list-files-folders',
      {
        params: {
          folder_id
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Google Drive folders:', error);
    throw error;
  }
};

export const deleteGoogleDriveFile = async (file_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/google-drive/delete/${file_id}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error deleting Google Drive file:', error);
    throw error;
  }
};
export const uploadGoogleDriveFile = async (file: File, folder_id: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_id', folder_id);

    const response = await axiosInstance.post(
      '/google-drive/upload-file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error uploading Google Drive file:', error);
    throw error;
  }
};
export const renameGoogleDriveFile = async (
  file_id: string,
  new_name: string
) => {
  try {
    const response = await axiosInstance.put(
      `/google-drive/rename/${file_id}`,
      { new_name },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error renaming Google Drive file:', error);
    throw error;
  }
};
export const createGoogleDriveFolder = async (
  name: string,
  folder_id: string
) => {
  try {
    const response = await axiosInstance.post(
      '/google-drive/folders',
      { name, folder_id },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error creating Google Drive folder:', error);
    throw error;
  }
};
export const shareGoogleDriveFile = async (
  file_id: string,
  email: string,
  role: string
) => {
  try {
    const response = await axiosInstance.post(
      `/google-drive/share/${file_id}`,
      { email, role },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error sharing Google Drive file:', error);
    throw error;
  }
};
