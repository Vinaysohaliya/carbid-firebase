import React from 'react';
import { Image } from '@nextui-org/react';

import img1 from '../assets/2800e9d2f0c3779e5e866d8fcc5734cb.png';
import img2 from '../assets/1c4224a67b9cf43cfbdb253c88d924e6.png';
import img3 from '../assets/8c083c9b23917bd7f8dd0ea86c1f4cb1.jpg';

const HowToBuy = () => {
    return (
        <div className='flex flex-col items-center md:items-start ml-10 my-6'>
            <div className='mb-4 font-bold text-center md:text-left'>How To Buy</div>
            <div className='flex flex-col md:flex-row mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img1}
                    className='md:mr-4'
                />
                <div className='mt-2 md:mt-0 md:ml-4'>
                    <div className='font-bold mb-2'>1. Choose the car you want</div>
                    <div>Browse through our certified collection of vehicles to find one which suits you the best</div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img2}
                    className='md:mr-4'
                />
                <div className='mt-2 md:mt-0 md:ml-4'>
                    <div className='font-bold mb-2'>2. Schedule a test drive</div>
                    <div>Schedule a test drive and enjoy the convenience of a test drive at your doorstep</div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img3}
                    className='md:mr-4'
                />
                <div className='mt-2 md:mt-0 md:ml-4'>
                    <div className='font-bold mb-2'>3. Place your bid</div>
                    <div>Place your bid on the vehicle of your choice </div>
                </div>
            </div>
        </div>
    )
}
export default HowToBuy;
