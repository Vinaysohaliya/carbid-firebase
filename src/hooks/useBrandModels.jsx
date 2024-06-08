import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../Redux/vehicleSlice';

const useBrandModels = (brandName) => {
  const [models, setModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrandModels = async () => {
      try {
        const res = await dispatch(fetchBrands());
        if (fetchBrands.fulfilled.match(res)) {
          const brandData = res.payload.find(brandObj => Object.keys(brandObj)[0] === brandName);
          if (brandData) {
            console.log(brandData);
            setModels(brandData[brandName]);
          } else {
            console.warn(`No data found for brand: ${brandName}`);
          }
        }
      } catch (error) {
        console.error('Error fetching brand models:', error);
      }
    };

    fetchBrandModels();
  }, [dispatch, brandName]);

  return models;
};

export default useBrandModels;
