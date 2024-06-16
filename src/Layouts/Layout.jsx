import React from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
    <div className='w-full'>
    <NavbarComponent />

    </div>
      <div className="flex-grow  w-full ">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
