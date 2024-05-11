import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidsByUserId } from '../../Redux/bidSlice';
import VehicleCard from '../Card/VehicleCard';

const MyBids = () => {
    const userId = useSelector((state) => state.auth.data.uid);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("sf");
                const res = await dispatch(fetchBidsByUserId(userId));
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, userId]);

    return (
        <div>
            <VehicleCard />
        </div>
    );
}

export default MyBids;
