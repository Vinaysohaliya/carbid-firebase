

import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../Redux/authSlice.js';

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
