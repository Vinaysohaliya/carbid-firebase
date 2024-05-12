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
        <div>
            <h2>All Vehicles</h2>
            {/* <Filters /> */}
            {userVehicles.map((vehicle) => (
                vehicle.auctionStatus && <VehicleCard key={vehicle.id} vehicle={vehicle} /> 
            ))}
        </div>
    );
};

export default VehicleList;
