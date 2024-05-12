import React from 'react';
import Navbar from './Navbar';
import VehicleList from '../pages/VehicleList';
import { Button } from '@nextui-org/react';
import BuyDashBoard from './BuyDashBoard';
import HowToBuy from './HowToBuy';
import WhyPeopleChooseUs from './WhyPeopleChooseUs';

const Home = () => {


    return (
        <div className='w-full'>
            <Navbar />
            <BuyDashBoard/>
            <HowToBuy/>
            <WhyPeopleChooseUs/>
            {/* <VehicleList/> */}
        </div>
    )
}

export default Home;