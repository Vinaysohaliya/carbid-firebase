import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, serverTimestamp, collection, getDocs, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../config/firebase';


export const placeBid = createAsyncThunk(
  'bids/placeBid',
  async ({ auctionId, bidAmount, userId, userName }) => {
    try {
        console.log(auctionId,bidAmount,userId,userName);
      // Fetch highest bid amount from the auction
      const bidSnapshot = await getDocs(collection(db, `auctions/${auctionId}/bids`));
      let highestBidAmount = 0;
      bidSnapshot.forEach((doc) => {
        const bidData = doc.data();
        if (bidData.amount > highestBidAmount) {
          highestBidAmount = bidData.amount;
        }
      });

      // Fetch starting bid from the vehicles collection
      const vehicleSnapshot = await getDocs(collection(db, 'vehicles'));
      let startingBid = 0;
      vehicleSnapshot.forEach((doc) => {
        const vehicleData = doc.data();
        if (doc.id === auctionId) {
          startingBid = vehicleData.startingBid;
        }
      });

      // Check if the new bid amount is higher than the highest bid amount and starting bid
      if (bidAmount <= highestBidAmount || bidAmount <= startingBid) {
        return { message: 'Bid amount must be greater than the Current bid and starting bid' };
      }

      // Place the bid
      const bidRef = await addDoc(collection(db, `auctions/${auctionId}/bids`), {
        amount: bidAmount,
        bidderId: userId,
        userName: userName,
        createdAt: serverTimestamp(),
      });

      return { id: bidRef.id, amount: bidAmount };
    } catch (error) {
      throw error; // Throw the error to be handled by createAsyncThunk
    }
  }
);


export const fetchBidsForAuction = createAsyncThunk(
    'bids/fetchBidsForAuction',
    async (auctionId, thunkAPI) => {
        try {
            const bidsCollectionRef = collection(db, `auctions/${auctionId}/bids`);
            const q = query(bidsCollectionRef);
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const bids = [];
                snapshot.forEach((doc) => {
                    bids.push({ id: doc.id, ...doc.data() });
                });
                thunkAPI.dispatch(setBids(bids)); // Dispatch action to update Redux state with fetched bids
            });

            return unsubscribe; // Return unsubscribe function to be used for cleanup
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



export const fetchBidsByUserId = createAsyncThunk(
  'bids/fetchBidsByUserId',
  async (userId) => {
    try {
      // Query the auctions collection for auctions where the userId matches
      const auctionQuerySnapshot = await getDocs(query(collection(db, 'auctions'), where('userId', '==', userId)));

      const bids = [];

      // For each auction where the userId matches, fetch the corresponding bids
      await Promise.all(auctionQuerySnapshot.docs.map(async (auctionDoc) => {
        const auctionId = auctionDoc.id;

        // Query the bids collection under the auction document
        const bidsQuerySnapshot = await getDocs(collection(db, `auctions/${auctionId}/bids`));

        // For each bid, fetch the bid data and add it to the bids array
        bidsQuerySnapshot.forEach((bidDoc) => {
          const bidData = bidDoc.data();
          bids.push({
            id: bidDoc.id,
            auctionId: auctionId,
            amount: bidData.amount,
            bidderId: bidData.bidderId,
            userName: bidData.userName,
            createdAt: bidData.createdAt,
          });
        });
      }));

     
      return bids;
    } catch (error) {
      throw error; // Throw the error to be handled by createAsyncThunk
    }
  }
);



const initialState = {
    loading: false,
    error: null,
    bids: [],
};

const bidSlice = createSlice({
    name: 'bids',
    initialState,
    reducers: {
        setBids(state, action) {
            state.bids = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeBid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeBid.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(placeBid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBids } = bidSlice.actions;

export default bidSlice.reducer;
