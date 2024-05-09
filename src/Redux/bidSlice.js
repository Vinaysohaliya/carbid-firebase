import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, serverTimestamp, collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export const 
placeBid = createAsyncThunk(
    'bids/placeBid',
    async ({ auctionId, bidAmount,userId,userName, }) => {
        try {
            console.log(auctionId,bidAmount,userId,userName);
            // Fetch the highest bid amount for the auction
            const bidSnapshot = await getDocs(collection(db, `auctions/${auctionId}/bids`));
            let highestBidAmount = 0;
            bidSnapshot.forEach((doc) => {
                const bidData = doc.data();
                if (bidData.amount > highestBidAmount) {
                    highestBidAmount = bidData.amount;
                }
            });

            console.log(highestBidAmount);

            // Check if the new bid amount is higher than the highest bid amount
            if (bidAmount <= highestBidAmount) {
                return { message: "bid amount must be greater" };
            }

            // Place the bid
            const bidRef = await addDoc(collection(db, `auctions/${auctionId}/bids/${userId}`), {
                amount: bidAmount,
                bidderId: userId, // Replace 'userId' with the actual user ID
                userName:userName,
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


export const fetchUserBids = createAsyncThunk(
  'mywishlist/fetchUserBids',
  async (userId, { rejectWithValue }) => {
    try {
      // Fetch all auctions where the user has placed a bid
      const auctionQuery = query(collection(db, 'auctions'), where(`bids.${userId}`, '!=', null));
      const auctionDocs = await getDocs(auctionQuery);

      // Array to store user's bids
      const userBids = [];

      // Iterate over auction documents
      for (const auctionDoc of auctionDocs) {
        // Get auction ID
        const auctionId = auctionDoc.id;

        // Fetch bids subcollection for the auction
        const bidsCollectionRef = collection(doc(db, 'auctions', auctionId), 'bids');

        // Fetch bid documents from the subcollection
        const bidQuery = query(bidsCollectionRef, where('userId', '==', userId));
        const bidDocs = await getDocs(bidQuery);

        // Add bids to userBids array
        bidDocs.forEach((bidDoc) => {
          userBids.push({ id: bidDoc.id, auctionId, ...bidDoc.data() });
        });
      }

      return userBids;
    } catch (error) {
      return rejectWithValue(error.message);
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
