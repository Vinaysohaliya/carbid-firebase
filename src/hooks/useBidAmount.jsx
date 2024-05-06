import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidData } from '../Redux/auctionSlice';

const useBidAmounts = () => {
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicle.onevehicle);

  useEffect(() => {
    const fetchBidAmounts = async () => {
      if (vehicle) {
        // Fetch starting bid amount and highest bid amount from the vehicle data
        try {
          const res = await dispatch(fetchBidData(vehicle.auctionId));

          setHighestBid(res.payload.highestBid.amount); // Assuming 'firstBid' contains the first bid object with an 'amount' field
          setStartingBid(res.payload.firstBid.amount);
        } catch (error) {
          console.error('Error fetching bid data:', error);
        }
      }
    };

    fetchBidAmounts();

  }, [dispatch, vehicle]);

  return { startingBid, highestBid };
};

export default useBidAmounts;
