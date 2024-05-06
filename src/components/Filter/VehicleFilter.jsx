import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

const CarType = ({ setFilterCriteria, checked, setChecked }) => {
  const vehicleTypes = [
    { label: "Car", value: "car" },
    { label: "Scooter", value: "scooter" },
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
    // Set the checked state of the checkbox based on the prop
    setChecked(checked);
  }, [checked, setChecked]);

  return (
    <div className="flex flex-col">
      {vehicleTypes.map((vehicleType) => (
        <Checkbox
          key={vehicleType.value}
          checked // Pass the checked state as a prop
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
