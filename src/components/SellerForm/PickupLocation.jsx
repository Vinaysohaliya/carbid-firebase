import React from 'react';
import { Checkbox, Input } from '@nextui-org/react';

const PickupLocation = ({ formData, setFormData }) => {
  const handlepickup = (e) => {
    // Handle pickup location checkbox
  };

  return (
    <div>
      <h2>Pickup Location</h2>
      <div className='flex items-center'>
        <Checkbox onChange={handlepickup}>Same as car location</Checkbox>
      </div>
      <Input
        type="text"
        placeholder="Enter pickup location"
        value={formData.pickupLocation}
        radius='sm'
        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
      />
    </div>
  );
};

export default PickupLocation;
