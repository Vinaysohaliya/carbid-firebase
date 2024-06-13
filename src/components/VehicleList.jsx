import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVehicles } from '../Redux/vehicleSlice.js';
import { Card, Skeleton } from '@nextui-org/react';
import VehicleCard from './Card/VehicleCard.jsx';

const VehicleList = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.vehicle.vehicles) || [];
    const loading = useSelector((state) => state.vehicle.loading);
    const uId = useSelector((state) => state.auth.data.uid);

    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch]);

    return (
        <div className='my-10'>
            <h2 className='font-bold my-4 text-center'>Vehicles on Auction</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center'>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] space-y-5 p-4" radius="lg">
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
                    ))
                ) : (
                    vehicles.map((vehicle) => (
                        vehicle.adminApprove === 'ACCEPT' && vehicle.evaluationDone === 'APPROVE' && vehicle.auctionStatus && (vehicle.userId!==uId) &&(
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        )
                    ))
                )}
            </div>
        </div>
    );
};

export default VehicleList;
