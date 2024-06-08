import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehiclesByFilter } from '../../Redux/vehicleSlice.js';
import CarType from '../Filter/VehicleFilter.jsx';
import FuleType from './FuleFilter.jsx';
import BrandsFilter from './BrandsFilter.jsx';
import TransmissionFilter from './TransmissionFilter.jsx';
import PriceRangeSlider from './PriceRangeSlider.jsx';
import DistanceFilter from './DistanceFilter.jsx';
import { Button, Card, CardBody } from '@nextui-org/react';

const Filters = () => {
  const dispatch = useDispatch();
  const [filterCriteria, setFilterCriteria] = useState({
    vehicleType: [],
    fuelType: [],
    brand: [],
    transmission: [],
    maxPrice: undefined,
    minPrice: undefined,
    distanceTraveled: []
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(fetchVehiclesByFilter(filterCriteria));
    };

    fetchVehicles();
  }, [filterCriteria, dispatch]);

  const clearFilters = () => {
    setFilterCriteria({
      vehicleType: [],
      fuelType: [],
      brand: [],
      transmission: [],
      maxPrice: 1000,
      minPrice: 0,
      distanceTraveled: []
    });
  };

  return (
    <Card radius='none' className="max-w-lg mx-auto">
      <CardBody className="flex flex-wrap  justify-center">
        <div className="flex justify-end w-full my-4">
          <div className='flex w-full items-center justify-between'>
            <div className='text-blue-500 text-2xl font-semibold '>Filter</div>
              <div type="button" onClick={clearFilters} className=" ">
                Clear all
              </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Vehicle</h2>
          <CarType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Fuel Type</h2>
          <FuleType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Brands</h2>
          <BrandsFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Transmission</h2>
          <TransmissionFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Price Range</h2>
          <PriceRangeSlider filterCriteria={filterCriteria} setFilter={setFilterCriteria} />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Distance Traveled</h2>
          <DistanceFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        </div>

      </CardBody>
    </Card>
  );
};

export default Filters;
