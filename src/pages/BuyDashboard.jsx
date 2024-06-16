import React from 'react';
import VehicleList from '../components/VehicleList';
import BuySearch from '../components/BuySearch';
import HowToBuy from '../components/HowToBuy';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';
import Exploreby from '../components/Exploreby';

const BuyDashBoard = () => {


    return (
        <div className='w-full'>
        <Exploreby/>
            <BuySearch/>
            <HowToBuy/>
            <VehicleList/>
            <WhyPeopleChooseUs/>
        </div>
    )
}

export default BuyDashBoard;