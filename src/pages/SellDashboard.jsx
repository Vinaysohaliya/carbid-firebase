import { Image } from '@nextui-org/react';
import React from 'react';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';
import Sellform from '../components/Sellform';
import sellimg from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg';

const SellDashboard = () => {
  return (
    <div className="h-full">
      <div className="relative">
        <Image src={sellimg} layout="fill" objectFit="cover" alt="Sell Image" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-8 md:mt-12">
          <Sellform />
        </div>
        <div className="mt-8 md:mt-12">
          <WhyPeopleChooseUs />
        </div>
      </div>
    </div>
  );
};

export default SellDashboard;
