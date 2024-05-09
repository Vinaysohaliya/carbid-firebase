import React from 'react';
import { Select } from '@nextui-org/react';

const VehicleDetails = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div>
      <Select
        value={formData.registrationYear}
        onChange={(value) => handleChange('registrationYear', value)}
        placeholder="Select registration year"
        className="mt-2"
        radius="sm"
      >
        {/* Options for registration year */}
      </Select>
      {/* Other vehicle details inputs */}
    </div>
  );
};

export default VehicleDetails;
