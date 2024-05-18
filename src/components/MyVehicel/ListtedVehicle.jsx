import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../Card/VehicleCard';

const ListtedVehicle = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.data.uid);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await dispatch(fetchUserSubmittedVehicles(userId));
                
                setVehicles(res.payload);
            } catch (error) {
                console.error('Error fetching vehicles:', error.message);
            }
        };
        fetchVehicles();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center mb-6'>Listed Vehicles</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center'>
                {vehicles && vehicles.map((vehicle) => (
                    <div key={vehicle.id}>
                        <VehicleCard isonListed={true} vehicle={vehicle} bids={vehicle.bids} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListtedVehicle;
