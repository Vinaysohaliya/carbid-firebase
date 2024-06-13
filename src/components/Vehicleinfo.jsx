import React from 'react';
import { Divider } from '@nextui-org/react';

const Vehicleinfo = ({ vehicle }) => {
  return (
    <div className='w-full md:w-1/2 mt-10 px-4 md:px-0'>
      <div className='flex flex-col'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Vehicle Type</p>
            <div>{vehicle.vehicleType}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Vehicle Brand</p>
            <div>{vehicle.brand}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Fuel Type</p>
            <div>{vehicle.fuelType}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Transmission</p>
            <div>{vehicle.transmission}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Mileage</p>
            <div>{vehicle.mileage}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Engine</p>
            <div>{vehicle.engine}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Max Power</p>
            <div>{vehicle.maxPower}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Torque</p>
            <div>{vehicle.torque}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Seats</p>
            <div>{vehicle.seats}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Wheel Size</p>
            <div>{vehicle.wheelSize}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Ownership</p>
            <div>{vehicle.ownerType}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Distance travelled</p>
            <div>{vehicle.distanceTravelled}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Registration year</p>
            <div>{vehicle.registrationYear}</div>
            <Divider className="my-4" />
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>Make year</p>
            <div>{vehicle.makeYear}</div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/3 mb-4'>
            <p className='font-light'>State code</p>
            <div>{vehicle.stateCode}</div>
            <Divider className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicleinfo;
