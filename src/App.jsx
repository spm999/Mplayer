import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/components/AuthContext';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Signup from './components/Signup/Signup';
import { useState } from 'react';

const App = () => {

  // const [displayName, setDisplayName] = useState('');

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/:userId/player" element={<MusicPlayer />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
