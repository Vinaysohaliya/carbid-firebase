import React from 'react';
import VehicleList from '../components/VehicleList';
import BuySearch from '../components/BuySearch';
import HowToBuy from '../components/HowToBuy';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';

const BuyDashBoard = () => {
  return (
    <div className='w-full'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <BuySearch />
        </div>
        <div className="col-span-1">
          <HowToBuy />
        </div>
        <div className="col-span-2">
          <VehicleList />
        </div>
        <div className="col-span-2">
          <WhyPeopleChooseUs />
        </div>
      </div>
    </div>
  );
};

export default BuyDashBoard;
