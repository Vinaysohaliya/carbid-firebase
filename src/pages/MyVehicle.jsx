import React, { useState } from 'react';
import MyVehicelLayout from '../Layouts/MyVehicleLayout';
import ListtedVehicle from '../components/MyVehicel/ListtedVehicle';
import Mywishlist from '../components/MyVehicel/Mywishlist';
import MyBids from '../components/MyVehicel/MyBids';

const MyVehicle = () => {
  const [selectedComponent, setSelectedComponent] = useState('listings');

  return (
    <MyVehicelLayout selectedComponent={setSelectedComponent}>
      {selectedComponent === 'listings' && <ListtedVehicle />}
      {selectedComponent === 'wishlist' && <Mywishlist />}
      {selectedComponent === 'bids' && <MyBids />}
    </MyVehicelLayout>
  );
};

export default MyVehicle;
