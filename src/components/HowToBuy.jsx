import { Image } from '@nextui-org/react'
import React from 'react'

const HowToBuy = () => {
    return (
        <div className=' flex flex-col ml-10 my-6 '>
            <div className=' mb-4 font-bold'>How To Buy</div>
            <div className=' flex mb-4 '>
                <Image
                    width={200}
                    height={200}
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"

                />
                <div className='ml-4'>
                    <div className=' font-bold'>1.Choose the car you want</div>
                    <div>Browse through our certified collection of vehicles to find one which suits you the best</div>
                </div>
            </div>
            <div className=' flex  mb-4'>
                <Image
                    width={200}
                    height={200}
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"

                />
                <div className='ml-4'>
                    <div className=' font-bold'>2.Schedule a test drive</div>
                    <div>Schedule a test drive and enjoy the convenience of a test drive at your doorstep</div>
                </div>
            </div>
            <div className=' flex  mb-4'>
                <Image
                    width={200}
                    height={200}
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"

                />
                <div className='ml-4'>
                    <div className=' font-bold' >3.Place your bid</div>
                    <div>Place your bid on the vehicle of your choice </div>
                </div>
            </div>
        </div>
    )
}
export default HowToBuy
