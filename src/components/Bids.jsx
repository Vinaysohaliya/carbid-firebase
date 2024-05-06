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
    <div>
      <h2>Bids</h2>
      <ul>
        {bids.map((bid) => (
          <li key={bid.id}>
            Bid Amount: 
            <Badge color="success">{bid.amount}</Badge>
            , Bidder Name: 
            <Badge color="primary">{bid.userName}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bids;
