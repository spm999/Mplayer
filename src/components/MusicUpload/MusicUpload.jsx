import React, { useState } from "react";
import { useAuth } from "../AuthContext"; // Import useAuth from your context file
// import { storageRef } from "../../firebase/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const MusicUpload = () => {
  const { user } = useAuth(); // Use the useAuth hook to get user from context
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setError("Please select a file");
    }
  };

  const handleUpload = async () => {
    if (file) {

      const storage = getStorage();
const fileRef = ref(storage, `music/${user?.uid}/${file.name}`);
      // const fileRef = storageRef(`music/${user?.uid}/${file.name}`);
      // Use optional chaining (user?.uid) to avoid potential errors if user is not defined
      // await fileRef.put(file);

      // 'file' comes from the Blob or File API
uploadBytes(fileRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

      setFile(null);
      setError(null);
    } else {
      setError("Please select a file before uploading");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MusicUpload;
