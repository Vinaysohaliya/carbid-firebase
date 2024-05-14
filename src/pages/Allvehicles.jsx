import React from 'react';
import VehicleList from '../components/VehicleList';
import Filters from '../components/Filter/Filters';

const Allvehicles = () => {
  return (
    <div className="flex">
      {/* Filters on the left */}
      <div className="w-1/4 pr-4">
        <Filters />
      </div>
      {/* Vehicle list on the right */}
      <div className="w-3/4">
        <VehicleList />
      </div>
    </div>
  );
};

export default Allvehicles;
