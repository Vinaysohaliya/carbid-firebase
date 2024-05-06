import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authSlice.js'; // Update import

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => { // Ensure async
    try {
      await dispatch(login({ email, password })); // Update function call
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
