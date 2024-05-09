import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../VehicleCard';

const Mywishlist = () => {
    const [vehicles, setvehicle] = useState([]);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.data.uid);
    console.log(userId);
    useEffect(() => {
        async function name() {
            const res = await dispatch(fetchLikedVehicles(userId));
            setvehicle(res.payload)
        }
        if (userId) { name(); }

    }, [dispatch,userId]);



    return (
        <div>
            <h1>My Wishlist</h1>
            {vehicles &&  vehicles.map((vehicle) => (
                vehicle.auctionStatus && <VehicleCard key={vehicle.id} vehicle={vehicle} /> 
            ))}
        </div>
    );
}

export default Mywishlist;
