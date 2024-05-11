import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from '../components/Card/VehicleCard.jsx';
import Filters from '../components/Filter/Filters.jsx';
import { fetchAllVehicles } from '../Redux/vehicleSlice.js'; // Updated import statement

const VehicleList = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles) || [];
    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch]); // Added dispatch as a dependency to useEffect
    return (
        <div >
            <h2>All Vehicles</h2>
            <Filters />
            {vehicles &&  vehicles.map((vehicle) => (
                vehicle.auctionStatus && <VehicleCard key={vehicle.id} vehicle={vehicle} /> 
            ))}
        </div>
    );
};

export default VehicleList;
