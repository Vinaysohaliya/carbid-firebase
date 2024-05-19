import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehiclesbutnotonAuction } from '../Redux/vehicleSlice';
import VehicleSellingForm from './VehicleForm';
import SimpleVehicleForm from './SimpleVehicleForm';
import { Card, CardHeader } from '@nextui-org/react';


const Sellform = () => {
  const [vehicles, setVehicles] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false); //  state for triggering refetch
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.uid);

  useEffect(() => {
    async function fetchUserVehicles() {
      if (userId || shouldRefetch) { // Check if userId is defined or shouldRefetch is true
        try {
          const res = await dispatch(fetchUserSubmittedVehiclesbutnotonAuction(userId));
          setVehicles(res.payload);
          setShouldRefetch(false); // Reset shouldRefetch after fetching
        } catch (error) {
          console.error('Error fetching user vehicles:', error.message);
        }
      }
    }
    fetchUserVehicles();
  }, [dispatch, userId, shouldRefetch]);

  const handleAddNewVehicle = (shouldRefetch) => {
    if (shouldRefetch) {
      setShouldRefetch(shouldRefetch);
    }
  };



  return (
    <div className='flex  flex-col items-center'>

      <Card className="py-4 mt-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className='flex flex-col items-center'>
            <div className='my-6'>Add vehicle to Auction</div>
            <SimpleVehicleForm onAddNewVehicle={handleAddNewVehicle} />
          </div>
        </CardHeader>

      </Card>
      <div ></div>

      <div className=' flex gap-6 my-10'>
        {vehicles.map((vehicle, index) => (
          !vehicle.auctionStatus && <VehicleSellingForm key={index} vehicle={vehicle} onAddNewVehicle={handleAddNewVehicle} />
        ))}
      </div>
    </div>
  );
};

export default Sellform;
