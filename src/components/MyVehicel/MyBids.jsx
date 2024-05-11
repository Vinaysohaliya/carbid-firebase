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
                console.log(res);
                setVehiclesWithBid(res.payload.bids);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, userId]);
      console.log();
    return (
        <div>
            {vehiclesWithBid.map((vehicle) => (
                <VehicleCard key={vehicle.id} isonMyBid={true} vehicle={vehicle.vehicle} MyBidAmount={vehicle.amount} />
            ))}
        </div>
    );
}

export default MyBids;
