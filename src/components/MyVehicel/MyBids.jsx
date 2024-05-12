import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidsByUserId } from '../../Redux/bidSlice';
import VehicleCard from '../Card/VehicleCard';

const MyBids = () => {
    const userId = useSelector((state) => state.auth.data.uid);
    const dispatch = useDispatch();
    const [vehiclesWithBid, setVehiclesWithBid] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(fetchBidsByUserId(userId));
                setVehiclesWithBid(res.payload.bids);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-center mb-6">My Bids</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center'>

                {vehiclesWithBid.map((vehicle) => (
                    <div key={vehicle.id}>
                        <VehicleCard isonMyBid={true} vehicle={vehicle.vehicle} MyBidAmount={vehicle.amount} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBids;
