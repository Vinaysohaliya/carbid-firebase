import React, { useState } from "react";
import { Slider } from "@nextui-org/react";

const PriceRangeSlider = ({ setFilter }) => {
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
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        label="Select a price range"
        formatOptions={{ style: "currency", currency: "USD" }}
        step={100}
        size="sm"
        maxValue={1000}
        minValue={0}
        value={priceRange}
        className="max-w-md"
        onChange={handleChange}
        onChangeEnd={handleSliderChangeEnd} // Use the handleSliderChangeEnd function for onChangeEnd event
      />
      <p className="text-default-500 font-medium text-small">
        Selected price range:{" "}
        {Array.isArray(priceRange) &&
          priceRange.map((price) => `$${price}`).join(" – ")}
      </p>
    </div>
  );
};

export default PriceRangeSlider;
