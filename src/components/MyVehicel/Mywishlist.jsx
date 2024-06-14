import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../Card/VehicleCard';
import { CircularProgress, Card, Skeleton } from '@nextui-org/react';

const MyWishlist = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state
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
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        }
        fetchData();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-start mb-6 font-bold text-2xl">My Wishlist</h2>
            {loading ? ( // Show loading skeleton if loading is true
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
                <div>
                    {vehicles.length === 0 ? ( // Show message if vehicles array is empty
                        <p className="text-center font-bold text-xl mt-8">No Vehicles in Your Wishlist</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {vehicles.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyWishlist;
