import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';



// Async thunk for fetching auction details
export const fetchAuctionDetails = createAsyncThunk(
  'vehicles/fetchAuctionDetails',
  async (vehicleId) => {
    try {
      const vehicleDocRef = doc(db, 'vehicles', vehicleId);
      const vehicleDocSnapshot = await getDoc(vehicleDocRef);
      if (vehicleDocSnapshot.exists()) {
        const vehicleData = vehicleDocSnapshot.data();
        const auctionId = vehicleData.auctionId;
        if (auctionId) {
          console.log(auctionId);
          const auctionDocRef = doc(db, 'auctions', auctionId);
          const auctionDocSnapshot = await getDoc(auctionDocRef);
          if (auctionDocSnapshot.exists()) {
            const auctionData = auctionDocSnapshot.data();
            console.log(auctionData);
            return auctionData;
          } else {
            throw new Error('Auction details not found');
          }
        } else {
          throw new Error('No auction associated with this vehicle');
        }
      } else {
        throw new Error('Vehicle not found');
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




export const addToAuction = createAsyncThunk(
  'auction/addToAuction',
  async ({ rejectWithValue }) => {
    try {
      const auctionDocRef = await addDoc(collection(db, 'auctions'), {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active'
      });

      const bidsCollectionRef = collection(db, `auctions/${auctionDocRef.id}/bids`);
      const vehicleRef = doc(db, 'vehicles', vehicleId);
      await updateDoc(vehicleRef, { auctionId: auctionDocRef.id, auctionStatus: true });

      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
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
