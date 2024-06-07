import React, { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

const FuelType = ({ filterCriteria, setFilterCriteria }) => {
  const fuelTypes = [
    { label: "CNG", value: "cng" },
    { label: "Petrol", value: "petrol" },
    { label: "Diesel", value: "diesel" }
  ];

  const handleCheckboxChange = (value, checked) => {
    setFilterCriteria((prevCriteria) => {
      let updatedTypes;
      if (checked) {
        updatedTypes = {
          ...prevCriteria,
          fuelType: [...(prevCriteria.fuelType || []), value]
        };
      } else {
        updatedTypes = {
          ...prevCriteria,
          fuelType: (prevCriteria.fuelType || []).filter(
            (type) => type !== value
          )
        };
      }

      return updatedTypes;
    });
  };

  useEffect(() => {
    fuelTypes.forEach((type) => {
      const checkboxElement = document.getElementById(type.value);
      if (checkboxElement) {
        checkboxElement.checked = filterCriteria.fuelType?.includes(type.value) || false;
      }
    });
  }, [filterCriteria]);
  

  return (
    <div className="flex flex-col">
      {fuelTypes.map((fuelType) => (
        <Checkbox
          key={fuelType.value}
          isSelected={filterCriteria.fuelType?.includes(fuelType.value) || false}
          onChange={(event) =>
            handleCheckboxChange(fuelType.value, event.target.checked)
          }
        >
          {fuelType.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default FuelType;
