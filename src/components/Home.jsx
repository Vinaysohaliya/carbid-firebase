import React from 'react';
import Navbar from './Navbar';
import VehicleList from '../pages/VehicleList';
import { Button } from '@nextui-org/react';

const Home = () => {


    return (
        <>
            <Navbar />
            <VehicleList/>
        </>
    )
}

export default Home;