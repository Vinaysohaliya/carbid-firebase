import React from 'react';
import SignIn from '../components/Signin';

const AuthLayout = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div>
      {isLoggedIn ? (
        children
      ) : (
        <SignIn/>
      )}
    </div>
  );
};

export default AuthLayout;
