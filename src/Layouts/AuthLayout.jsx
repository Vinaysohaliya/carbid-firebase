import React from 'react';
import SignIn from '../components/Signin';

const AuthLayout = ({ children }) => {
  // Check if the user is logged in by accessing data from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div>
      {isLoggedIn ? (
        // Render children if user is logged in
        children
      ) : (
        <SignIn/>
      )}
    </div>
  );
};

export default AuthLayout;
