import React from 'react';
import VehicleList from '../components/VehicleList';
import Filters from '../components/Filter/Filters';

const Allvehicles = () => {
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">
        <Filters />
      </div>
      <div className="w-3/4">
        <VehicleList />
      </div>
    </div>
  );
};

export default Allvehicles;
