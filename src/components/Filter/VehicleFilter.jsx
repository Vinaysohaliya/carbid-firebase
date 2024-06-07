import React, { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

const CarType = ({ filterCriteria, setFilterCriteria }) => {
  const vehicleTypes = [
    { label: "Car", value: "car" },
    { label: "Scooter", value: "scooty" },
    { label: "Bike", value: "bike" }
  ];

  const handleCheckboxChange = (value, isChecked) => {
    setFilterCriteria((prevCriteria) => {
      let updatedTypes;
      if (isChecked) {
        updatedTypes = [...(prevCriteria.vehicleType || []), value];
      } else {
        updatedTypes = (prevCriteria.vehicleType || []).filter(
          (type) => type !== value
        );
      }

      return {
        ...prevCriteria,
        vehicleType: updatedTypes
      };
    });
  };

  useEffect(() => {
    vehicleTypes.forEach((type) => {
      document.getElementById(type.value).checked =
        filterCriteria.vehicleType?.includes(type.value) || false;
    });
  }, [filterCriteria]);

  return (
    <div className="flex flex-col">
      {vehicleTypes.map((vehicleType) => (
        <Checkbox
          key={vehicleType.value}
          id={vehicleType.value}
          isSelected={filterCriteria.vehicleType?.includes(vehicleType.value) || false}
          onChange={(event) =>
            handleCheckboxChange(vehicleType.value, event.target.checked)
          }
        >
          {vehicleType.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default CarType;
