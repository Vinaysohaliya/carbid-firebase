import React, { useEffect, useState } from 'react';
import SignIn from '../components/Signin';

const AuthLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage or any other authentication mechanism
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoggedInStatus === 'true');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? (
        // Render children if logged in
        <div className="flex-grow">{children}</div>
      ) : (
        // Render sign-in component if not logged in
        <SignIn />
      )}
    </div>
  );
};

export default AuthLayout;
