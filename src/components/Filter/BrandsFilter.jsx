import React from 'react';
import { Checkbox } from '@nextui-org/react';
import useBrands from '../../hooks/useBrands';

const BrandsFilter = ({ filterCriteria, setFilterCriteria }) => {
  const popularBrands = useBrands(); 

  const handleCheckboxChange = (brand, checked) => {
    if (checked) {
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        brand: [...(prevCriteria.brand || []), brand]
      }));
    } else {
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        brand: (prevCriteria.brand || []).filter(b => b !== brand)
      }));
    }
  };
  return (
    <div className="flex flex-col">
      {popularBrands.map((brand) => (
        <Checkbox
          key={brand}
          isSelected={filterCriteria.brand?.includes(brand) || false}
          onChange={(event) => handleCheckboxChange(brand, event.target.checked)}
        >
          {brand}
        </Checkbox>
      ))}
    </div>
  );
};

export default BrandsFilter;
