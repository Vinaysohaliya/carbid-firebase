import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSubmittedVehicles } from '../../Redux/vehicleSlice';
import VehicleCard from '../Card/VehicleCard';
import { Card, Skeleton } from '@nextui-org/react';

const ListtedVehicle = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.data.uid);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await dispatch(fetchUserSubmittedVehicles(userId));
                setVehicles(res.payload);
            } catch (error) {
                console.error('Error fetching vehicles:', error.message);
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        };
        fetchVehicles();
    }, [dispatch, userId]);

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-start mb-6 font-bold text-2xl'>Listed Vehicles</h2>
            {loading ? ( // Show skeleton loading effect while loading is true
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                    {[...Array(6)].map((_, index) => (
                        <div key={index}>
                            <Card className="w-full space-y-5 p-4" radius="lg">
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                    {vehicles.length === 0 ? (
                        <p className='font-bold mt-8  text-xl text-center'>No Listed Vehicles</p>
                    ) : (
                        vehicles.map((vehicle) => (
                            <div key={vehicle.id}>
                                <VehicleCard isonListed={true} vehicle={vehicle} bids={vehicle.bids} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ListtedVehicle;
