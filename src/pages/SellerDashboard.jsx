import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleSellingForm from '../components/VehicleForm';
import { fetchUserSubmittedVehicles } from '../Redux/vehicleSlice';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.uid);

  useEffect(() => {
  async function vehicle() {
    if (userId) {
        const res=await dispatch(fetchUserSubmittedVehicles(userId));
   console.log(res);

       }

   }
   vehicle();
  }, [dispatch, userId]);

  return (
    <div>
      <VehicleSellingForm />
    </div>
  );
};

export default SellerDashboard;
