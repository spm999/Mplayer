import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const Auth = () => {
  const provider = new GoogleAuthProvider();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      login(result.user);
      console.log('You are successfully LoggedIn');
    } catch (error) {
      console.error('Email login error:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      login(result.user);
      console.log('Google login successful');
    } catch (error) {
      console.error('Google login error:', error.message);
    }
  };

  if (user) {
    const userId = user.uid;
    const redirectUrl = `/${userId}/player`;
    return <Navigate to={redirectUrl} />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login with Email</button>
      </form>

      <button onClick={handleGoogleLogin}>Login with Google</button>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
      <p>
        <Link to="/forgotpassword">Forgot your password? </Link>
      </p>
    </div>
  );
};

export default Auth;
