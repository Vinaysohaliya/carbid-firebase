import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehiclesByFilter } from '../../Redux/vehicleSlice.js';
import CarType from './VehicleFilter.jsx';
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
    // Add any other filter criteria here
  });

  // State variables to track checkbox states
  const [carChecked, setCarChecked] = useState(false);
  const [fuelChecked, setFuelChecked] = useState(false);
  const [brandChecked, setBrandChecked] = useState(false);
  const [transmissionChecked, setTransmissionChecked] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(fetchVehiclesByFilter(filterCriteria));
    };

    fetchVehicles();
  }, [filterCriteria, dispatch]); // Run effect when filterCriteria or dispatch change

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setFilterCriteria({
      vehicleType: [],
      fuelType: [],
      brand: [],
      transmission: [],
    });

    setCarChecked(false);
    setFuelChecked(false);
    setBrandChecked(false);
    setTransmissionChecked(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CarType setFilterCriteria={setFilterCriteria} checked={carChecked} setChecked={setCarChecked} />
        <FuleType setFilterCriteria={setFilterCriteria} checked={fuelChecked} setChecked={setFuelChecked} />
        <BrandsFilter setFilterCriteria={setFilterCriteria} checked={brandChecked} setChecked={setBrandChecked} />
        <TransmissionFilter setFilterCriteria={setFilterCriteria} checked={transmissionChecked} setChecked={setTransmissionChecked} />
        <PriceRangeSlider setFilter={setFilterCriteria} />
        <div className="flex justify-end">
          <button type="button" onClick={clearFilters} className="text-blue-500 hover:underline">
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
