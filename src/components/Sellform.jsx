import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehiclesbutnotonAuction } from '../Redux/vehicleSlice';
import VehicleSellingForm from './VehicleForm';
import SimpleVehicleForm from './SimpleVehicleForm';
import { Card, CardHeader } from '@nextui-org/react';

const Sellform = () => {
  const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.uid);

  useEffect(() => {
    async function fetchUserVehicles() {
      if (userId || shouldRefetch) {
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
    <div className='flex flex-col items-center'>
      <Card className="py-4 mt-4 w-full sm:max-w-screen-lg">
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
          <div className='my-6 font-bold text-2xl text-center sm:text-left'>Add Vehicle to Auction</div>
          <SimpleVehicleForm  />
        </CardHeader>
      </Card>

      <div className='flex flex-col items-center mt-6 sm:flex-row sm:justify-center sm:items-start sm:flex-wrap gap-6'>
        {vehicles.map((vehicle, index) => (
          !vehicle.auctionStatus && <VehicleSellingForm key={index} vehicle={vehicle}  />
        ))}
      </div>
    </div>
  );
};

export default Sellform;
