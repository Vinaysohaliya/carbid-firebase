import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehiclesbutnotonAuction } from '../Redux/vehicleSlice';
import SimpleVehicleForm  from '../components/SimpleVehicleForm'
import VehicleSellingForm from '../components/VehicleForm';

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
  !vehicle.auctionStatus && <VehicleSellingForm key={index} vehicle={vehicle} />
))}

      <SimpleVehicleForm/>

    </div>
  );
};

export default SellerDashboard;
