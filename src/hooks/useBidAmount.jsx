import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBidData } from '../Redux/auctionSlice';

const useBidAmounts = ({vehicleId,auctionId}) => {
  const [startingBid, setStartingBid] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBidAmounts = async () => {
      if (vehicleId && auctionId) {
        try {
          const res = await dispatch(fetchBidData({ auctionId,vehicleId }));
          // Assuming 'res.payload' contains the 'highestBid' and 'firstBid' objects
          setHighestBid(res.payload.highestBid.amount);
          setStartingBid(res.payload.firstBid.amount);
        } catch (error) {
          console.error('Error fetching bid data:', error);
        }
      }
    };

    fetchBidAmounts();

  }, [dispatch, vehicleId,auctionId]);

  return { startingBid, highestBid };
};

export default useBidAmounts;
