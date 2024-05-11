import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../Card/VehicleCard';
import SellerVehicleCard from '../Card/SellerVehicleCard';

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
        <div>
            <h2>Listed Vehicles</h2>
            {vehicles && vehicles.map((vehicle) => (
                <SellerVehicleCard vehicle={vehicle} key={vehicle.id} />
            ))}
        </div>
    );
};

export default ListtedVehicle;
