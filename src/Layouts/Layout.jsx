import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <div className="flex-grow container mx-auto px-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
