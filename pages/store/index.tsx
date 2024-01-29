import React, { useRef, useState } from 'react';
import { Button, Uploader, Panel, Modal } from 'rsuite';
import Copy from '@rsuite/icons/Copy';
import { API_STORE } from 'utils/constants';
import { FileType } from 'rsuite/esm/Uploader';
import useCustomToast from 'hooks/useCustomToast';
import { extractError } from 'utils/request';
import { useOverview } from 'hooks/useOverview';

const StorePage = () => {
  const [file, setFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [randomHash, setRandomHash] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { showInfo, showError } = useCustomToast();
  const uploader = useRef<any>();
  const { triggerFetch } = useOverview();

  const handleUpload = (fileList) => {
    if (fileList.length > 0) {
      // Select only the first file from the list
      const newFile = fileList[fileList.length - 1];
      setFile(newFile);
    } else {
      // No file selected, clear the existing file
      setFile(null);
    }
  };

  const handleUploadSuccess = (response: any, file: FileType) => {
    if (response.status) {
      setRandomHash(response?.hash || '');
      setShowSuccessModal(true);

      triggerFetch();
    } else {
      showError(response?.error_msg);
    }

    setCopied(false); // Reset copied state when new hash is generated
    setLoading(false);
    setFile(null);
  };

  const handleUploadError = (reason: object, file: FileType) => {
    const error = extractError(reason);
    showError(error);
    setLoading(false);
    setFile(null);
  };

  const handleOnStartUpload = () => {
    setLoading(true);
  };

  const handleSubmit = () => {
    // Logic for submitting the uploaded file
    if (uploader && uploader.current) uploader.current.start();
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCopy = () => {
    // Logic to copy the hash to the clipboard
    navigator.clipboard.writeText(randomHash);
    setCopied(true);
    showInfo('Hash copied to clipboard');
  };

  return (
    <Panel style={{ position: 'relative' }}>
      <div style={{ marginBottom: '20px' }}>
        <Uploader
          fileList={file ? [file] : []}
          ref={uploader}
          action={API_STORE} // Set your backend upload endpoint here
          method='POST'
          name='file'
          autoUpload={false}
          draggable
          multiple={false}
          fileListVisible={true}
          onChange={handleUpload}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
          onUpload={handleOnStartUpload}
          disabled={loading}
        >
          <div
            style={{
              height: '200px',
              border: '2px dashed #aaa',
              textAlign: 'center',
              paddingTop: '80px',
            }}
          >
            <p>{'Click or drag to upload'}</p>
          </div>
        </Uploader>
      </div>

      {file && (
        <Panel header='File Information'>
          <p>{`File Name: ${file.name}`}</p>
          <p>{`File Size: ${file.blobFile.size} bytes`}</p>
          {/* Add more information about the uploaded file if needed */}
        </Panel>
      )}

      <div className='grid place-content-end'>
        <Button onClick={handleSubmit} appearance='primary' loading={loading}>
          {'Submit'}
        </Button>
      </div>

      <Modal
        backdrop='static'
        open={showSuccessModal}
        onClose={handleCloseModal}
        size='xs'
      >
        <Modal.Header>
          <Modal.Title className='text-green font-bold'>
            {'Success'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{'Your file has been successfully submitted!'}</p>
          <p>{'Please save your hash id'}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0' }}>{randomHash.slice(0, 18)}</p>
            <Button
              appearance='subtle'
              onClick={handleCopy}
              disabled={!randomHash}
              size='sm'
            >
              <Copy />
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} appearance='primary'>
            {'OK'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Panel>
  );
};

export default StorePage;
