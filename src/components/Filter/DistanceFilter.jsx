import { Checkbox } from '@nextui-org/react';
import React from 'react';

const DistanceFilter = ({ filterCriteria, setFilterCriteria }) => {
  const distanceOptions = [
    { label: '0 to 10,000 kms', value: '0-10000' },
    { label: '10,000 to 20,000 kms', value: '10000-20000' },
    { label: '20,000 to 30,000 kms', value: '20000-30000' },
    { label: '30,000 to 40,000 kms', value: '30000-40000' },
    { label: '40,000 to 50,000 kms', value: '40000-50000' },
    { label: 'More than 50,000 kms', value: '50000-9007199254740991' }
  ];

  const handleDistanceChange = (event) => {
    const { value, checked } = event.target;
    const newDistance = checked
      ? [...filterCriteria.distanceTraveled, value]
      : filterCriteria.distanceTraveled.filter((distance) => distance !== value);

    setFilterCriteria({ ...filterCriteria, distanceTraveled: newDistance });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Distance Traveled</h3>
      {distanceOptions.map((option) => (
        <div key={option.value} className="flex items-center">
          <Checkbox
            type="checkbox"
            id={option.value}
            name="distanceTraveled"
            value={option.value}
            checked={filterCriteria.distanceTraveled.includes(option.value)}
            onChange={handleDistanceChange}
            className="mr-2"
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default DistanceFilter;
