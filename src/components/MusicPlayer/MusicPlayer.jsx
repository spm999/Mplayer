import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { storageRef } from '../../firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, list, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import MusicUpload from '../MusicUpload/MusicUpload';
import './MusicPlayer.css'

const MusicPlayer = () => {
  const storage = getStorage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadmessage, setUploadmessage] =useState("")

  const fetchSongs = async () => {
    if (user?.uid) {
      const fileName = `music/${user.uid}`;
      const spaceRef = ref(storageRef, fileName);
      const songsList = await list(spaceRef, { maxResults: 100 });

      const songsArray = await Promise.all(
        songsList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );

      setSongs(songsArray);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // console.log('Logout successful');
      logout();
      navigate('/');
    } catch (error) {
      console.error('There was some error', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If the user is not authenticated, navigate to the login page
        navigate('/login');
      } else {
        fetchSongs(); // Fetch songs when the user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth, navigate]);

  const toggleSongSelection = (index) => {
    const isSelected = selectedSongs.includes(index);
    if (isSelected) {
      // Song is already selected, so unselect it
      setSelectedSongs(selectedSongs.filter((selectedIndex) => selectedIndex !== index));
    } else {
      // Song is not selected, so select it
      setSelectedSongs([...selectedSongs, index]);
    }
  };


  const DeleteSelectedSongs = () => {
    // Delete selected songs
    const deletePromises = selectedSongs.map((index) => {
      const desertRef = ref(storage, `music/${user.uid}/${songs[index].name}`);
      return deleteObject(desertRef);
    });

    Promise.all(deletePromises)
      .then(() => {
        // File(s) deleted successfully
        let newSongList = [...songs];
        selectedSongs.forEach((index) => {
          newSongList.splice(index, 1);
        });
        setSongs(newSongList);
        setSelectedSongs([]);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error('Error deleting file(s):', error);
      });
  };
  const handleFileUploadSuccess = () => {
    fetchSongs(); // Refresh the song list after uploading
  };

  return (

  <div className='musicplayer-container'>
  <button className='logout' onClick={handleLogout}>Logout</button>
  <div className="columns">
    <table>
      <thead>
        <tr>
          <th>Upload</th>
          <th>Song List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <MusicUpload onUploadSuccess={handleFileUploadSuccess} />
            {uploading && <p>Uploading...</p>}
            {uploadmessage && <p>{uploadmessage}</p>}
          </td>
          <td>
            <ul className='song-list'>
              {songs.map((song, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={selectedSongs.includes(index)}
                    onChange={() => toggleSongSelection(index)}
                  />
                  <audio controls>
                    <source src={song.url} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <p>{song.name}</p>
                </li>
              ))}
            </ul>
            {selectedSongs.length > 0 && (
              <button className='delete' onClick={DeleteSelectedSongs}>
                Delete Selected Songs
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MusicPlayer;
