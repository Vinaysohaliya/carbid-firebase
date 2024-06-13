import React from 'react';
import VehicleList from '../components/VehicleList';
import Filters from '../components/Filter/Filters';

const Allvehicles = () => {
  return (
    <div className="flex flex-col md:flex-row"> {/* Flex column for mobile, flex row for larger screens */}
      <div className="md:w-1/6 pr-4"> {/* Sidebar with filters */}
        <Filters />
      </div>
      <div className="md:w-5/6"> {/* Vehicle list */}
        <VehicleList />
      </div>
    </div>
  );
};

export default Allvehicles;
