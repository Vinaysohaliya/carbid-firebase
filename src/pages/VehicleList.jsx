import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from '../components/Card/VehicleCard.jsx';
import Filters from '../components/Filter/Filters.jsx';
import { fetchAllVehicles } from '../Redux/vehicleSlice.js';

const VehicleList = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.data.uid);
    const vehicles = useSelector((state) => state.vehicle.vehicles) || [];

    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch]);
    // Filter out only the vehicles that belong to the logged-in user
    const userVehicles = vehicles.filter(vehicle => vehicle.userId !== userId);

    return (
        <div className=' my-10'>
            <h2 className='font-bold my-4'>Vehicles on auction</h2>
            <div className=' flex gap-4'>
            {userVehicles.map((vehicle) => (
                vehicle.auctionStatus && <VehicleCard key={vehicle.id} vehicle={vehicle} /> 
            ))}
            </div>
        </div>
    );
};

export default VehicleList;
