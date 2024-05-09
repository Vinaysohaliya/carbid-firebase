import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
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
          const auctionDocRef = doc(db, 'auctions', auctionId);
          const auctionDocSnapshot = await getDoc(auctionDocRef);
          if (auctionDocSnapshot.exists()) {
            const auctionData = auctionDocSnapshot.data();
            auctionData.auctionId = auctionId;
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
  async ({ vehicleId }) => {
    try {
      const auctionQuery = query(collection(db, 'auctions'), where('vehicleId', '==', vehicleId));
      const auctionQuerySnapshot = await getDocs(auctionQuery);
      if (!auctionQuerySnapshot.empty) {
        const auctionDocRef = auctionQuerySnapshot.docs[0].ref;
        await deleteDoc(auctionDocRef);
      }

      const vehicleDocRef = doc(db, 'vehicles', vehicleId);
      await deleteDoc(vehicleDocRef);

      const userQuery = query(collection(db, 'users'), where('submittedVehicles', 'array-contains', vehicleId));
      const userQuerySnapshot = await getDocs(userQuery);
      if (!userQuerySnapshot.empty) {
        const userDocRef = userQuerySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          submittedVehicles: userQuerySnapshot.docs[0].data().submittedVehicles.filter(id => id !== vehicleId)
        });
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  }
);





export const fetchBidData = createAsyncThunk(
  'bid/fetchBidData',
  async (auctionId, thunkAPI) => {
    try {
      // Get the reference to the bids collection for the auction
      const bidsCollectionRef = collection(db, `auctions/${auctionId}/bids`);
      // Fetch all bids documents
      const bidsQuerySnapshot = await getDocs(bidsCollectionRef);
      // Initialize variables to store highest and first bid
      let highestBid = 0;
      let firstBid = 0;

      // Iterate through the query snapshot to find highest and first bid
      bidsQuerySnapshot.forEach((bidDoc) => {
        const bidData = bidDoc.data();
        console.log(bidData);
        // If highestBid is null or bid amount is greater, update highestBid
        if (bidData.amount > highestBid) {
          highestBid = bidData;
          console.log(bidData.amount);
        }
        // If firstBid is null, update firstBid
        if (bidData.createdAt < firstBid.createdAt) {
          firstBid = bidData;
        }
      });
      console.log(highestBid);

      // Return the highest and first bid
      return { highestBid, firstBid };
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
      // Create a new auction document
      const auctionDocRef = await addDoc(collection(db, 'auctions'), {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'active'
      });

      // Create a collection of bids under the new auction document
      const bidsCollectionRef = collection(db, `auctions/${auctionDocRef.id}/bids`);
      console.log(auctionDocRef, bidsCollectionRef, vehicleId);
      // Update the vehicle document to include a reference to the auction document
      const vehicleRef = doc(db, 'vehicles', vehicleId);
      await updateDoc(vehicleRef, { auctionId: auctionDocRef.id, auctionStatus: true });

      // If the update is successful, return the vehicleId
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






// // Thunk action to fetch the winner of the auction
// export const fetchAuctionWinner = createAsyncThunk(
//   'auction/fetchWinner',
//   async (auctionId, thunkAPI) => {
//     try {
//       // Fetch the auction document from Firestore
//       const auctionDoc = await firebase.firestore().collection('auctions').doc(auctionId).get();
//       if (auctionDoc.exists) {
//         const auctionData = auctionDoc.data();
//         // Check if the auction has bids
//         if (auctionData.bids && auctionData.bids.length > 0) {
//           const winner = sortedBids[0];
//           return winner;
//         } else {
//           // If there are no bids, there is no winner
//           return null;
//         }
//       } else {
//         // If the auction does not exist, return null
//         return null;
//       }
//     } catch (error) {
//       // Handle any errors and reject with the error message
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );


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
        console.log(action.payload);
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
