import { Image } from '@nextui-org/react';
import React from 'react';
import WhyPeopleChooseUs from '../components/WhyPeopleChooseUs';
import Sellform from '../components/Sellform';
import SimpleVehicleForm from '../components/SimpleVehicleForm';

const SellDashboard = () => {
  return (
    <div className='h-full '>
      <div className=''>
        <Image src='https://s3-alpha-sig.figma.com/img/bf90/91a8/d0202be409abd6ce3bc3cb03884c56e7?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K4CT3JSTvXGPvdLZgKtDmpEozrjww8kEvD1uvuTUVITgah79BuJxspqKQn0wR0G5fvk24wZpf1Nu8s25mkdf7QeVKYT6Imf6QHW8d1ns8TR0ddlQ4S4Sm272sH3dYhk6mxZYnmDjO7Nvu8pqL7t9LHf6MEK6RSVyWV3YxiDu0BLtlTwM7tYUmbklS5mLNRNcSiD7BzkEo5QDggU0jfHC~dhZNWXfJdaLUq5kCwq4kUL1RrUugrHtaCrQBXICm7eGbCIZQHKuMyDT~srs1NeHnvLC~8hrRJT807cIGy2D-8REytUyCQGJaOTQsiC-QpC6RKhUN4UJblVE805Bnfiw8g__' />
      </div>
    
      <>
        <Sellform  />
      </>
      <WhyPeopleChooseUs />
    </div>
  );
};

export default SellDashboard;
