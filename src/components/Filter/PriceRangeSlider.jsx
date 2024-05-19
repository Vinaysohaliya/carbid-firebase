import React, { useState } from "react";
import { Slider } from "@nextui-org/react";

const PriceRangeSlider = ({ filterCriteria,setFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleSliderChangeEnd = (newValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 h-full max-w-md items-start justify-center">
      <Slider
        label="Select a price range"
        formatOptions={{ style: "currency", currency: "INR" }}
        step={100}
        size="sm"
        maxValue={1000}
        minValue={0}
        value={priceRange}
        className="max-w-md"
        onChange={handleChange}
        onChangeEnd={handleSliderChangeEnd} // Use the handleSliderChangeEnd function for onChangeEnd event
      />
     
    </div>
  );
};

export default PriceRangeSlider;
