import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/components/AuthContext';
import Auth from './components/Auth/Auth';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/:userId/player" element={<MusicPlayer />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
