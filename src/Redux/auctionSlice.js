import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';




export const fetchAuctionDetails = createAsyncThunk(
  'vehicles/fetchAuctionDetails',
  async (vehicleId) => {
    try {
      // Query the auctions collection where vehicleId matches the provided vehicleId
      const auctionQuery = query(collection(db, 'auctions'), where('vehicleId', '==', vehicleId));
      const auctionSnapshot = await getDocs(auctionQuery);

      if (!auctionSnapshot.empty) {
        // Assuming there's only one auction per vehicle, take the first document
        const auctionDoc = auctionSnapshot.docs[0];
        const auctionData = auctionDoc.data();
        auctionData.id = auctionDoc.id;

        return auctionData;
      } else {
        throw new Error('No auction found for this vehicle');
      }
    } catch (error) {
      throw error;
    }
  }
);





export const removeFromAuction = createAsyncThunk(
  'auction/removeFromAuction',
  async ({ vehicleId,userId }) => {
    try {
      const auctionQuery = query(collection(db, 'auctions'), where('vehicleId', '==', vehicleId));
      const auctionQuerySnapshot = await getDocs(auctionQuery);
      if (!auctionQuerySnapshot.empty) {
        const auctionDocRef = auctionQuerySnapshot.docs[0].ref;
        await deleteDoc(auctionDocRef);
      }

      const vehicleDocRef = doc(db, 'vehicles', vehicleId);
      await deleteDoc(vehicleDocRef);

      const userRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userRef);
      
      if (userDocSnapshot.exists()) {
        const submittedVehicles = userDocSnapshot.data().submittedVehicleId;
        const updatedSubmittedVehicles = submittedVehicles.filter(id => id !== vehicleId);
        
        await updateDoc(userRef, { submittedVehicleId: updatedSubmittedVehicles });
      } else {
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
);





export const fetchBidData = createAsyncThunk(
  'bid/fetchBidData',
  async ({ auctionId, vehicleId }, thunkAPI) => { // Correct the payload creator function to accept an object with auctionId and vehicleId
    try {
      console.log(auctionId,vehicleId);
      // Get the reference to the bids collection for the auction
      const bidsCollectionRef = collection(db, `auctions/${auctionId}/bids`);
      // Fetch all bids documents
      const bidsQuerySnapshot = await getDocs(bidsCollectionRef);
      let highestBid = 0;

      // Get the reference to the starting bid document for the vehicle
      const startingBidRef = doc(db, 'vehicles', vehicleId);
      const startingBidDoc = await getDoc(startingBidRef);

      // Check if the starting bid document exists
      if (startingBidDoc.exists()) {
        // Access the data of the starting bid document
        const startingBidData = startingBidDoc.data();
        // Assign the starting bid data to firstBid
        const firstBid = startingBidData.startingBid;
        
        bidsQuerySnapshot.forEach((bidDoc) => {
          const bidData = bidDoc.data();
          if (bidData.amount > highestBid) {
            highestBid = bidData.amount;
          }
        });

        // Return the highest and first bid
        return { highestBid, firstBid };
      } else {
        // If the starting bid document does not exist, return an error
        return thunkAPI.rejectWithValue('Starting bid document does not exist');
      }
    } catch (error) {
      // If any error occurs, reject the thunk with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);







// Initial state for vehicles slice
const initialState = {
  loading: false,
  error: null,
  auctionDetails: null,
};

// Vehicle slice with reducers and extra reducers
const auctionSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuctionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.auctionDetails = action.payload;
      })
      .addCase(fetchAuctionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBidData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidData.fulfilled, (state, action) => {
        // state.highestBid = action.payload.highestBid;
        // state.firstBid = action.payload.firstBid;
        state.loading = false;
      })
      .addCase(fetchBidData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default auctionSlice.reducer;
