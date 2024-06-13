import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBidsForAuction } from '../Redux/bidSlice'; // Update the path to your thunk
import { Badge } from '@nextui-org/react';

const Bids = ({ auctionId }) => {
  const dispatch = useDispatch();
  const bids = useSelector((state) => state.bid.bids);

  useEffect(() => {
    dispatch(fetchBidsForAuction(auctionId));
  }, [dispatch, auctionId]);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Bids</h2>
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-lg">Bid Amount: <Badge color="success">{bid.amount}</Badge></p>
            </div>
            <div>
              <p className="text-lg">Bidder Name: <Badge color="primary">{bid.userName}</Badge></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bids;
