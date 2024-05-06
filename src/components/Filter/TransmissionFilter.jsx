import React from "react";
import { Checkbox } from "@nextui-org/react";

const TransmissionFilter = ({  setFilterCriteria }) => {
  const transmissionTypes = [
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ];

  const handleCheckboxChange = (value, checked) => {
    setFilterCriteria((prevCriteria) => {
      let updatedTransmission;
      if (checked) {
        // Add the selected transmission type to the filter criteria array
        updatedTransmission = [...(prevCriteria.transmission || []), value];
      } else {
        // Remove the deselected transmission type from the filter criteria array
        updatedTransmission = (prevCriteria.transmission || []).filter(type => type !== value);
      }
  
      return {
        ...prevCriteria,
        transmission: updatedTransmission
      };
    });
  };
  

  return (
    <div className="flex flex-col">
      {transmissionTypes.map((transmission) => (
        <Checkbox
          key={transmission.value}
          onChange={(event) => handleCheckboxChange(transmission.value, event.target.checked)}
        >
          {transmission.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default TransmissionFilter;
