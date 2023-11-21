import React, { useState } from 'react';
import './App.css';

function App() {
  const [hash, setHash] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [storing, setStoring] = useState(false);
  const [retrieving, setRetrieving] = useState(false);
  const [response, setResponse] = useState(null);

  const handleStore = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
      setStoring(true)
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/store/`, {
        method: 'POST',
        body: formData,
      });
      setStoring(false)

      if (!res.ok) {
        console.error('Error response from server:', res);
        return;
      }
  
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  

  const handleRetrieve = async () => {
    try {
      let filename = 'downloaded-file';
      if (!hash) {
        console.error('No hash provided');
        return;
      }
      setRetrieving(true)
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/retrieve/?hash=${hash}`)
      .then(response => {
        if (!response.ok) {
          console.error('Error response from server:', response);
          return;
        }
        setRetrieving(false)
        // Extract filename from Content-Disposition header
        // Inspect the headers in the response
        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        filename = filenameMatch ? filenameMatch[1] : 'downloaded-file';
        return response.blob();
      })
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a); // append the element to the dom
        a.click();
        a.remove(); // afterwards, remove the element  
      })
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <div className="App">
      <img src="/tao.png" alt="Tao" className="logo" />
      <div className="container">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Hash" 
            value={hash} 
            onChange={(e) => setHash(e.target.value)} 
          />
          <input 
            type="file" 
            onChange={(e) => setSelectedFile(e.target.files[0])} 
          />
        </div>
        <div className="button-group">
          <button onClick={handleStore} disabled={storing | retrieving}>{storing ? 'Storing...' : 'Store'}</button>
          <button onClick={handleRetrieve} disabled={storing | retrieving}>{retrieving ? 'Retrieving...' : 'Retrieve'}</button>
        </div>
        {response && <div className="response">Response: {JSON.stringify(response)}</div>}
      </div>
    </div>
  );
}
  




export default App;
