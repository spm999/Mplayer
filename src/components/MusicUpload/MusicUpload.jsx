import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../AuthContext';

const MusicUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadmessage, setUploadmessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { user } = useAuth();
  const storage = getStorage();

  const handleFileChange = (event) => {
    // setSelectedFiles(event.target.files);
       const files = event.target.files;
    // Filter out files that are not MP3
    const mp3Files = Array.from(files).filter((file) =>
      file.name.toLowerCase().endsWith('.mp3')
    );
    setSelectedFiles(mp3Files);
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadmessage('Error: Please select audio file(s) before uploading.');
      setTimeout(() => setUploadmessage(''), 3000);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const fileName = file.name;
        const fileRef = ref(storage, `music/${user.uid}/${fileName}`);
        await uploadBytes(fileRef, file);
      });

      await Promise.all(uploadPromises);
      setUploadmessage('Upload Successful');
      onUploadSuccess(); // Trigger the parent component to refresh the song list
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={!selectedFiles}>
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
      {uploadmessage && <p style={{color:"green"}}>{uploadmessage}</p>}
    </div>
  );
};

export default MusicUpload;
