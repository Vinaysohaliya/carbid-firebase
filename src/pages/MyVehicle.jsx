import React, { useState } from 'react';
import MyVehicelLayout from '../Layouts/MyVehicleLayout';
import ListtedVehicle from '../components/MyVehicel/ListtedVehicle';
import Mywishlist from '../components/MyVehicel/Mywishlist';
import MyBids from '../components/MyVehicel/MyBids';

const MyVehicle = () => {
  const [selectedComponent, setSelectedComponent] = useState('listings');

  return (
    <MyVehicelLayout selectedComponent={setSelectedComponent}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <button
            className={`block w-full py-2 rounded-md focus:outline-none ${
              selectedComponent === 'listings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedComponent('listings')}
          >
            Listings
          </button>
        </div>
        <div>
          <button
            className={`block w-full py-2 rounded-md focus:outline-none ${
              selectedComponent === 'wishlist' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedComponent('wishlist')}
          >
            Wishlist
          </button>
        </div>
        <div>
          <button
            className={`block w-full py-2 rounded-md focus:outline-none ${
              selectedComponent === 'bids' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedComponent('bids')}
          >
            Bids
          </button>
        </div>
      </div>
      <div className="mt-4 md:mt-8">
        {selectedComponent === 'listings' && <ListtedVehicle />}
        {selectedComponent === 'wishlist' && <Mywishlist />}
        {selectedComponent === 'bids' && <MyBids />}
      </div>
    </MyVehicelLayout>
  );
};

export default MyVehicle;
