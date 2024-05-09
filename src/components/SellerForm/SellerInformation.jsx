import React from 'react';
import { RadioGroup, Radio, Input } from '@nextui-org/react';

const SellerInformation = ({ formData, setFormData }) => {
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div>
      <RadioGroup value={formData.sellerType} label="Seller Type" onChange={(value) => handleChange('sellerType', value.target.value)}>
        <div className='flex'>
          <Radio value="dealer" className=' mr-2'>Dealer</Radio>
          <Radio value="individual">Individual</Radio>
        </div>
      </RadioGroup>
      {/* Other seller information inputs */}
    </div>
  );
};

export default SellerInformation;
