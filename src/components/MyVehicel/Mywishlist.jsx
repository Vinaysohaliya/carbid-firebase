import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../Card/VehicleCard';

const MyWishlist = () => {
    const [vehicles, setVehicles] = useState([]);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.data.uid);

    useEffect(() => {
        async function fetchData() {
            try {
                if (userId) {
                    const res = await dispatch(fetchLikedVehicles(userId));
                    setVehicles(res.payload);
                }
            } catch (error) {
                console.error('Error fetching liked vehicles:', error.message);
            }
        }
        fetchData();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-center mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center">
                {vehicles && vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default MyWishlist;
