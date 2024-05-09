import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleSellingForm from '../components/VehicleForm';
import { fetchUserSubmittedVehiclesbutnotonAuction } from '../Redux/vehicleSlice';

const SellerDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.uid);

  useEffect(() => {
    async function fetchUserVehicles() {
      if (userId) {
        try {
          const res = await dispatch(fetchUserSubmittedVehiclesbutnotonAuction(userId));
          setVehicles(res.payload);
        } catch (error) {
          console.error('Error fetching user vehicles:', error.message);
        }
      }
    }
    fetchUserVehicles();
  }, [dispatch, userId]);

  return (
    <div>
      {vehicles.map((vehicle, index) => (
        <VehicleSellingForm key={index} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default SellerDashboard;
