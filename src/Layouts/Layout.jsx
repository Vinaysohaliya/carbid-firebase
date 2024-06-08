import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <div className='mt-4'>
        <Footer />

      </div>
    </div>
  );
};

export default Layout;
