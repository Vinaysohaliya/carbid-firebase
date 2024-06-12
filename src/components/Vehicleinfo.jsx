import { Divider } from '@nextui-org/react'
import React from 'react'
import vehicleSlice from '../Redux/vehicleSlice';

const Vehicleinfo = ({ vehicle}) => {
  // console.log(Vehicleinfo);
  return (
    <div className='w-1/2 mt-10'>
      <div className='flex  ml-20 flex-col'>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Vehicle Type</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Vehicle Brand</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Fule Type</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Transmission</p>
            <div>{Vehicleinfo.transmission}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Mileage</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Engine</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Max Power</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Torque</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Seats</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Wheel Size</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Ownership</p>
            <div>{Vehicleinfo.ownerType}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Distance travelled</p>
            <div>{Vehicleinfo.travelDistance}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>Registration year</p>
            <div>{Vehicleinfo.registrationYear}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-1/3'>
            <p className='font-light'>Make year</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className=' flex justify-between w-full'>
          <div className=' w-1/3'>
            <p className='font-light'>State code</p>
            <div>Car</div>
            <Divider className="my-4" />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Vehicleinfo
