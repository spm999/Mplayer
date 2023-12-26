// import React, { useEffect } from 'react';
// import { useAuth } from '../AuthContext';
// import { storageRef } from '../../firebase/firebase';
// import { getAuth, signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import MusicUpload from '../MusicUpload/MusicUpload';

// import { ref , list} from "firebase/storage";


// const MusicPlayer = () => {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const fetchSongs = async () => {
//     if (user?.uid) {
//       const fileName = `music/${user.uid}`;
//       const spaceRef = ref(storageRef, fileName);
//       const songsList = await list(spaceRef, { maxResults: 100 });

//       const songsArray = await Promise.all(
//         songsList.items.map(async (item) => {
//           return { name: item.name };
//         })
//       );

//       console.log(songsArray);
//     } else {
//       navigate('/login');
//     }
//   };


//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('Logout successful');
//       logout(); // Call logout function from context
//       navigate('/login');
//     } catch (error) {
//       console.error('There was some error', error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchSongs();
//     } else {
//       navigate('/login');
//     }
//   }, [user, fetchSongs, navigate]);

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={fetchSongs}>Fetch Songs</button>
//       <MusicUpload />
//       <ul>
//         {/* Render your songs here */}
//       </ul>
//     </div>
//   );
// };

// export default MusicPlayer;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { storageRef } from '../../firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MusicUpload from '../MusicUpload/MusicUpload';

import { ref, list, getDownloadURL } from 'firebase/storage';

const MusicPlayer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    if (user?.uid) {
      const fileName = `music/${user.uid}`;
      const spaceRef = ref(storageRef, fileName);
      const songsList = await list(spaceRef, { maxResults: 100 });

      const songsArray = await Promise.all(
        songsList.items.map(async (item) => {
          // const url = await item.getDownloadURL();
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
      console.log('Logout successful');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('There was some error', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSongs();
    } else {
      navigate('/login');
    }
  }, [user, fetchSongs, navigate]);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={fetchSongs}>Fetch Songs</button>
      <MusicUpload />
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <audio controls>
              <source src={song.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <p>{song.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
