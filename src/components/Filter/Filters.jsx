// Filters.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehiclesByFilter } from '../../Redux/vehicleSlice.js';
import CarType from '../Filter/VehicleFilter.jsx'; // Assuming you renamed the component
import FuleType from './FuleFilter.jsx';
import BrandsFilter from './BrandsFilter.jsx';
import TransmissionFilter from './TransmissionFilter.jsx';
import PriceRangeSlider from './PriceRangeSlider.jsx';

const Filters = () => {
  const dispatch = useDispatch();
  const [filterCriteria, setFilterCriteria] = useState({
    vehicleType: [],
    fuelType: [],
    brand: [],
    transmission: [],
    maxPrice:0,
    minPrice:0
  });
  console.log(filterCriteria);

  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(fetchVehiclesByFilter(filterCriteria));
    };

    fetchVehicles();
  }, [filterCriteria, dispatch]); // Run effect when filterCriteria or dispatch change

  
  const clearFilters = () => {
    setFilterCriteria({
      vehicleType: [],
      fuelType: [],
      brand: [],
      transmission: [],
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="space-y-4">

        <CarType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        <FuleType filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        <BrandsFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        <TransmissionFilter filterCriteria={filterCriteria} setFilterCriteria={setFilterCriteria} />
        <PriceRangeSlider filterCriteria={filterCriteria} setFilter={setFilterCriteria} />

        <div className="flex justify-end">
          <button type="button" onClick={clearFilters} className="text-blue-500 hover:underline">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
