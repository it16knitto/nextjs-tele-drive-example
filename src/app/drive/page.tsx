'use client';
import { useState, useEffect } from 'react';
import {
  FaFolder,
  FaTrash,
  FaPencilAlt,
  FaDownload,
  FaCopy,
  FaArrowRight,
  FaHome,
  FaUpload,
  FaPlus,
  FaShareAlt
} from 'react-icons/fa';
import {
  createGoogleDriveFolder,
  deleteGoogleDriveFile,
  fetchGoogleDriveFileAndFolders,
  renameGoogleDriveFile,
  shareGoogleDriveFile,
  uploadGoogleDriveFile
} from '../../services/drive';
import Image from 'next/image';
import Modal from '@/components/modal';
import Link from 'next/link';
import { FileSystemItem } from '../../interface/drive';

export default function FileManager() {
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([]);
  const [currentPath, setCurrentPath] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null);
  const [isModalFileManagerOpen, setModalFileManagerOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openModalFileManager = () => setModalFileManagerOpen(true);
  const closeModalFileManager = () => setModalFileManagerOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchGoogleDriveFileAndFolders(
          currentFolderId || undefined
        );
        setFileSystem(result.data);
      } catch (err) {
        setError('Failed to fetch Google Drive files and folders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentFolderId, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  const handleItemClick = async (item: FileSystemItem) => {
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      setCurrentFolderId(item.id);
      setCurrentPath([...currentPath, { id: item.id, name: item.name }]);
    } else {
      // Handle file click (e.g., open file, show details, etc.)
    }
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      setCurrentFolderId(
        newPath.length > 0 ? newPath[newPath.length - 1].id : null
      );
    }
  };

  const handleDelete = async (item: FileSystemItem) => {
    try {
      await deleteGoogleDriveFile(item.id);
      refetch();
    } catch (err) {
      console.error('Failed to delete file:', err);
      setError('Failed to delete file');
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    item: FileSystemItem | null,
    action: string
  ) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { name: { value: string } };

    try {
      if (action === 'rename') {
        if (!item) throw new Error('No item selected');
        await renameGoogleDriveFile(item.id, target.name.value);
      } else if (action === 'new-folder') {
        await createGoogleDriveFolder(target.name.value, currentFolderId || '');
      } else if (action === 'share') {
        if (!item) throw new Error('No item selected');
        await shareGoogleDriveFile(item.id, target.name.value, 'writer');
      }
      closeModal();
      refetch();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        await uploadGoogleDriveFile(file, currentFolderId || '');
        refetch();
      } catch (err) {
        console.error('Failed to upload file:', err);
        setError('Failed to upload file');
      }
    }
  };

  const renderFileSystemItem = (item: FileSystemItem) => (
    <div
      key={item.id}
      className='flex items-center justify-between p-2 hover:bg-gray-100'
    >
      <div
        className='flex items-center cursor-pointer'
        onClick={() => handleItemClick(item)}
      >
        {item.mimeType === 'application/vnd.google-apps.folder' ? (
          <FaFolder className='mr-2 text-yellow-500' />
        ) : (
          <Image
            src={item.iconLink}
            alt='File icon'
            className='mr-2 w-5 h-5'
            width={20}
            height={20}
          />
        )}
        <span>{item.name}</span>
      </div>
      <div className='flex space-x-2'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item);
          }}
          className='p-1 hover:bg-red-100 rounded'
        >
          <FaTrash className='text-red-500' />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTitle('rename');
            setSelectedItem(item);
            openModal();
          }}
          className='p-1 hover:bg-blue-100 rounded'
        >
          <FaPencilAlt className='text-blue-500' />
        </button>
        <Link
          href={`${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
          }/google-drive/download/${item.id}`}
          target='_blank'
        >
          <button className='p-1 hover:bg-green-100 rounded'>
            <FaDownload className='text-green-500' />
          </button>
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation(); /* Implement copy functionality */
          }}
          className='p-1 hover:bg-purple-100 rounded'
        >
          <FaCopy className='text-purple-500' />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); /* Implement move functionality */
          }}
          className='p-1 hover:bg-orange-100 rounded'
        >
          <FaArrowRight className='text-orange-500' />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTitle('share');
            setSelectedItem(item);
            openModal();
          }}
          className='p-1 hover:bg-teal-100 rounded'
        >
          <FaShareAlt className='text-teal-500' />
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>File Manager</h1>
      <div className='mb-4 flex items-center'>
        {currentPath.length > 0 ? (
          <button
            onClick={handleBackClick}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2'
          >
            Back
          </button>
        ) : (
          <button
            className='p-2 text-gray-600 hover:text-blue-500'
            onClick={() => {
              setCurrentFolderId(null);
              setCurrentPath([]);
            }}
          >
            <FaHome className='text-xl' />
          </button>
        )}
        <span className='ml-2'>
          {currentPath.map((folder: any) => folder.name).join(' / ')}
        </span>
      </div>
      <div className='mb-4 flex space-x-2'>
        <label className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer'>
          <FaUpload className='inline mr-2' />
          Upload
          <input type='file' className='hidden' onChange={handleUpload} />
        </label>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTitle('new-folder');
            openModal();
          }}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          <FaPlus className='inline mr-2' />
          New Folder
        </button>
      </div>
      <div className='border rounded'>
        {fileSystem.map(renderFileSystemItem)}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='p-4'>
          <h2 className='text-xl font-bold mb-4'>{title}</h2>
          <form onSubmit={(e) => handleSubmit(e, selectedItem, title)}>
            <div className='mb-4'>
              <input
                type='text'
                id='name'
                name='name'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
