import React from 'react';
import Sidebar from '../components/MyVehicel/Sidebar';

const MyVehicelLayout = ({ children, selectedComponent }) => {
  return (
    <div className="flex flex-col md:flex-row"> {/* flex-col for mobile, flex-row for larger screens */}
      <Sidebar onSelectComponent={selectedComponent} />
      <div className="flex-grow container mx-auto md:ml-96 md:pl-4"> {/* Adjust margin and padding based on screen size */}
        {children}
      </div>
    </div>
  );
};

export default MyVehicelLayout;
