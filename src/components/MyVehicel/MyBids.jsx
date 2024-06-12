import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidsByUserId } from '../../Redux/bidSlice';
import VehicleCard from '../Card/VehicleCard';
import { CircularProgress, Card, Skeleton } from '@nextui-org/react';

const MyBids = () => {
    const userId = useSelector((state) => state.auth.data.uid);
    const dispatch = useDispatch();
    const [vehiclesWithBid, setVehiclesWithBid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(fetchBidsByUserId(userId));
                setVehiclesWithBid(res.payload.bids);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-start mb-6 font-bold text-2xl">My Bids</h2>
            {loading ? ( // Show skeleton loading effect while loading is true
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center'>
                    {[...Array(6)].map((_, index) => (
                        <div key={index}>
                            <Card className="w-[200px] space-y-5 p-4" radius="lg">
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">  
                                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center'>
                    {vehiclesWithBid.map((vehicle) => (
                        <div key={vehicle.id}>
                            <VehicleCard isonMyBid={true} vehicle={vehicle.vehicle} MyBidAmount={vehicle.amount} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBids;
