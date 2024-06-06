import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from './Card/VehicleCard.jsx';
import { fetchAllVehicles } from '../Redux/vehicleSlice.js';

const VehicleList = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles) || [];

    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch]);

    return (
        <div className=' my-10'>
            <h2 className='font-bold my-4'>Vehicles on auction</h2>
            <div className=' flex gap-4'>
                {vehicles.map((vehicle) => (
                    vehicle.adminApprove === 'ACCEPT' && vehicle.evaluationDone === 'APPROVE' && <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default VehicleList;
