import React, { useState, useEffect } from "react";
import { Slider } from "@nextui-org/react";

const PriceRangeSlider = ({ filterCriteria, setFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    if (filterCriteria.minPrice !== undefined && filterCriteria.maxPrice !== undefined) {
      setPriceRange([filterCriteria.minPrice, filterCriteria.maxPrice]);
    }
  }, [filterCriteria]);

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
    <div className="flex flex-col gap-2  h-full max-w-md items-start justify-center">
      <div className=" flex items-center w-full justify-between">
        <div> ₹{priceRange[0]}</div>
        <div> ₹{priceRange[1]}</div>
      </div>
      <Slider
        label=""
        formatOptions={{ style: "currency", currency: "INR" }}
        step={100}
        size="sm"
        maxValue={1000}
        minValue={0}
        value={priceRange}
        className="max-w-md"
        onChange={handleChange}
        onChangeEnd={handleSliderChangeEnd}
      />
    </div>
  );
};

export default PriceRangeSlider;
