import { Image } from '@nextui-org/react';
import React from 'react';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';
import Sellform from '../components/Sellform';
import sellimg from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg'

const SellDashboard = () => {
  return (
    <div className='h-full '>
      <div className=''>
        <Image 
        src={sellimg} />
      </div>
      <>
        <Sellform />
      </>
      <WhyPeopleChooseUs />
    </div>
  );
};

export default SellDashboard;
