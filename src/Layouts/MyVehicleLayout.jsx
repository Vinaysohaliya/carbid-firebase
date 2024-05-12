import React from 'react';
import Sidebar from '../components/MyVehicel/Sidebar';

const MyVehicelLayout = ({ children, selectedComponent }) => {
  return (
    <div className="flex flex-col md:flex-row"> {/* flex-col for mobile, flex-row for larger screens */}
      <Sidebar onSelectComponent={selectedComponent} />
      <div className="flex-grow container mx-auto md:pl-96"> {/* Adjust padding based on screen size */}
        {children}
      </div>
    </div>
  );
};

export default MyVehicelLayout;
