import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../Redux/vehicleSlice';

const useBrands = () => {
  const [popularBrands, setPopularBrands] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const res = await dispatch(fetchBrands());
        if (fetchBrands.fulfilled.match(res)) {
          const brandsArray = res.payload.map((brandObj) => {
            const brandName = Object.keys(brandObj)[0];
            return brandName;
          });

          setPopularBrands(brandsArray);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrandsData();
  }, [dispatch]);

  return popularBrands;
};

export default useBrands;
