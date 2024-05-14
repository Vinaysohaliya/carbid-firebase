import React from "react";
import { Checkbox } from "@nextui-org/react";

const BrandsFilter = ({ filterCriteria, setFilterCriteria }) => {
  const popularBrands = [
    { label: "Maruti Suzuki", value: "maruti" },
    { label: "Hyundai", value: "hyundai" },
    { label: "Tata", value: "tata" },
    { label: "Mahindra", value: "mahindra" },
    { label: "Honda", value: "honda" },
    // Add more popular Indian brands as needed
  ];

  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      // Add the selected brand to the filter criteria array
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        brand: [...(prevCriteria.brand || []), value]
      }));
    } else {
      // Remove the deselected brand from the filter criteria array
      setFilterCriteria((prevCriteria) => ({
        ...prevCriteria,
        brand: (prevCriteria.brand || []).filter(brand => brand !== value)
      }));
    }
  };

  return (
    <div className="flex flex-col">
      {popularBrands.map((brand) => (
        <Checkbox
        radius="none"
          key={brand.value}
          onChange={(event) => handleCheckboxChange(brand.value, event.target.checked)}
        >
          {brand.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default BrandsFilter;
