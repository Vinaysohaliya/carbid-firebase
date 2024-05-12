
import React from 'react';
import NavbarComponent from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
    <NavbarComponent/>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
