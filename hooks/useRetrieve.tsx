import axios from 'axios';
import { useState } from 'react';
import { API_RETRIEVE, API_SHARD_INFO } from 'utils/constants';
import useCustomToast from 'hooks/useCustomToast';
import { transformShardInfo } from 'utils/transformer';
import { ShardInfo } from 'utils/common';

export function useRetrieve() {
  const [hashValue, setHashValue] = useState<string>('');
  const [fileInfo, setFileInfo] = useState<ShardInfo | null>();
  const [retrieveLoading, setRetrieveLoading] = useState<boolean>(false);
  const [getInfoLoading, setGetInfoLoading] = useState<boolean>(false);
  const { showError } = useCustomToast();

  const handleGetInfo = async () => {
    const fileInfo = await getFileInformation(hashValue);

    if (fileInfo) {
      setFileInfo(fileInfo);
    } else {
      showError('File information not available.');
    }
  };

  const getFileInformation = async (fileHash): Promise<ShardInfo> => {
    const retrieveUrl = `${API_SHARD_INFO}?hash=${fileHash}`;

    setGetInfoLoading(true);
    try {
      const response = await axios.get(retrieveUrl);

      if (response.status === 200) {
        const fileData: ShardInfo = transformShardInfo(response.data);
        return fileData;
      } else {
        throw new Error('Failed to fetch file information');
      }
    } catch (error) {
      return null;
    } finally {
      setGetInfoLoading(false);
    }
  };

  const handleRetrieve = () => {
    handleDownload(hashValue);
  };

  const handleDownload = async (hashValue) => {
    const downloadUrl = `${API_RETRIEVE}?hash=${hashValue}`;
    setRetrieveLoading(true);
    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Extract filename from the response headers or set a default name
      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'UnknownFileName';
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();
    } catch (error) {
      showError('Error downloading file');
    } finally {
      setRetrieveLoading(false);
    }
  };

  return {
    hashValue,
    setHashValue,
    fileInfo,
    handleRetrieve,
    handleGetInfo,
    retrieveLoading,
    getInfoLoading,
  };
}
