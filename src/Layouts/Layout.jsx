
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
