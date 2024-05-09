// vehicleSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, query, getDocs, addDoc, updateDoc, getDoc, where, arrayUnion } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../config/firebase';
import { update } from 'firebase/database';



// Async thunk for fetching all vehicles
export const fetchAllVehicles = createAsyncThunk(
  'vehicles/fetchAll',
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vehicles'));
      const vehicles = [];
      querySnapshot.forEach((doc) => {
        vehicles.push({ id: doc.id, ...doc.data() });
      });
      return vehicles;
    } catch (error) {
      throw error;
    }
  }
);


export const fetchUserAuctions = createAsyncThunk(
  'auctions/fetchUserAuctions',
  async (userId) => {
    try {
      // Query the 'auctions' collection to fetch auctions associated with the user
      const auctionQuery = query(collection(db, 'auctions'), where('userId', '==', userId));
      
      // Get the documents from the auction query
      const auctionSnapshot = await getDocs(auctionQuery);
      
      // Initialize an array to store fetched auctions with vehicle details
      const userAuctions = [];

      // Iterate through the auction query snapshot
      for (const auctionDoc of auctionSnapshot.docs) {
        const auctionData = auctionDoc.data();

        // Fetch vehicle details associated with the auction
        const vehicleDocRef = doc(db, 'vehicles', auctionData.vehicleId);
        const vehicleDocSnapshot = await getDoc(vehicleDocRef);

        if (vehicleDocSnapshot.exists()) {
          const vehicleData = vehicleDocSnapshot.data();

          // Push the auction data along with the vehicle details to the array
          userAuctions.push({ id: auctionDoc.id, ...auctionData, vehicleDetails: vehicleData });
        }
      }

      // Return the fetched auctions with vehicle details
      return userAuctions;
    } catch (error) {
      throw error;
    }
  }
);




export const submitVehicleDetails = createAsyncThunk(
  'vehicles/submitToFirebase',
  async ({ vehicleData, vehiclePhotos, userId, idProof }) => {
    try {
      // Upload vehicle photos to Firebase Storage and get download URLs
      const photoUrls = await Promise.all(vehiclePhotos.map(async (photoFile) => {
        const photoRef = ref(storage, `vehiclePhotos/${userId}/${photoFile.name}`);
        await uploadBytes(photoRef, photoFile);
        return getDownloadURL(photoRef);
      }));

      // Upload ID proof to Firebase Storage and get download URL
      const idProofRef = ref(storage, `idProofs/${userId}/${idProof.name}`);
      await uploadBytes(idProofRef, idProof);
      const idProofUrl = await getDownloadURL(idProofRef);

      // Add the vehicle document to the 'vehicles' collection in Firestore
      const vehicleDocRef = await addDoc(collection(db, 'vehicles'), {
        userId,
        idProof: idProofUrl,
        ...vehicleData,
        vehiclePhotos: photoUrls,
        auctionStatus: false, // Set auction status to false initially
        createdAt: new Date(),
      });

      // Get the ID of the newly created vehicle document
      const vehicleId = vehicleDocRef.id;

      // Add the vehicle to the user's submitted vehicles array
      await updateDoc(doc(db, 'users', userId), {
        submittedVehicleId: arrayUnion(vehicleId),
      });

      // Create an auction document for the vehicle in the 'auctions' collection
      // Note: You may need to adjust the auction details based on your application logic
      await addDoc(collection(db, 'auctions'), {
        vehicleId,
        userId,
        auctionStatus: false, // Set auction status to false initially
        createdAt: new Date(),
      });

      // Return relevant data
      return { vehicleId, userId, idProof: idProofUrl, ...vehicleData, vehiclePhotos: photoUrls, createdAt: new Date(), vehicleRef: vehicleDocRef };
    } catch (error) {
      throw error;
    }
  }
);




// Async thunk action to fetch vehicle details
export const fetchVehicle = createAsyncThunk(
  'auction/fetchVehicle',
  async (vehicleId) => {
    try {
      // Fetch the vehicle document from Firestore
      console.log(vehicleId);
      const vehicleDoc = await getDoc(doc(db, 'vehicles', vehicleId));
      console.log(vehicleDoc);
      // Check if the document exists
      if (!vehicleDoc.exists()) {
        throw new Error('Vehicle not found');
      }

      // Extract vehicle data from the document
      const vehicleData = vehicleDoc.data();

      return vehicleData;
    } catch (error) {
      throw error;
    }
  }
);



export const fetchUserSubmittedVehicles = createAsyncThunk(
  'auction/fetchUserSubmittedVehicles',
  async (userId) => {
    try {
      const userVehiclesQuery = query(collection(db, 'vehicles'), where('userId', '==', userId));
      const querySnapshot = await getDocs(userVehiclesQuery);

      const userSubmittedVehicles = [];
      querySnapshot.forEach((doc) => {
        userSubmittedVehicles.push({ id: doc.id, ...doc.data() });
      });

      return userSubmittedVehicles;
    } catch (error) {
      throw error;
    }
  }
);






export const fetchVehiclesByFilter = createAsyncThunk(
  'vehicles/fetchByFilter',
  async (filterCriteria) => {
    try {
      // Destructure filter criteria properties with default values
      const {
        brand = [],
        distanceTraveled = [],
        fuelType = [],
        vehicleType = [],
        maxPrice,
        minPrice
      } = filterCriteria || {};

      // Convert filter criteria properties to lowercase arrays
      const brandValues = brand.map(value => value.toLowerCase());
      const distanceTraveledValues = distanceTraveled.map(value => value.toLowerCase());
      const fuelTypeValues = fuelType.map(value => value.toLowerCase());
      const vehicleTypeValues = vehicleType.map(value => value.toLowerCase());

      let queryRef = collection(db, 'vehicles');

      // Add conditions for brand, distance traveled, fuel type, and vehicle type
      if (brandValues.length > 0) {
        queryRef = query(queryRef, where('brand', 'in', brandValues));
      }
      if (distanceTraveledValues.length > 0) {
        queryRef = query(queryRef, where('distanceTraveled', 'in', distanceTraveledValues));
      }
      if (fuelTypeValues.length > 0) {
        queryRef = query(queryRef, where('fuelType', 'in', fuelTypeValues));
      }
      if (vehicleTypeValues.length > 0) {
        queryRef = query(queryRef, where('vehicleType', 'in', vehicleTypeValues));
      }


      // Add conditions for price range
      if (minPrice !== undefined && maxPrice !== undefined) {
        queryRef = query(queryRef, where('price', '>=', minPrice), where('price', '<=', maxPrice));
      } else if (minPrice !== undefined) {
        queryRef = query(queryRef, where('price', '>=', minPrice));
      } else if (maxPrice !== undefined) {
        queryRef = query(queryRef, where('price', '<=', maxPrice));
      }

      const querySnapshot = await getDocs(queryRef);

      const vehicles = [];
      querySnapshot.forEach((doc) => {
        vehicles.push({ id: doc.id, ...doc.data() });
      });

      return vehicles;
    } catch (error) {
      throw error;
    }
  }
);

export const toggleVehicleLike = createAsyncThunk(
  'vehicle/toggleLike',
  async ({ vehicleId, userId }, thunkAPI) => {
    try {
      // Fetch the user's document
      const userRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userRef);

      // Check if the user document exists
      if (!userDocSnapshot.exists()) {
        throw new Error("User not found");
      }

      // Get the liked vehicles array from the user document
      let likedVehicles = userDocSnapshot.data().likedVehicles || [];

      // Check if the vehicle is already liked
      const index = likedVehicles.indexOf(vehicleId);

      if (index !== -1) {
        // If already liked, remove the vehicle from the likedVehicles array
        likedVehicles.splice(index, 1);
        // Update the user document with the modified likedVehicles array
        await updateDoc(userRef, {
          likedVehicles: likedVehicles
        });
        return false; // Return false indicating that the vehicle is unliked
      } else {
        // If not liked, add the vehicle to the likedVehicles array
        likedVehicles.push(vehicleId);
        // Update the user document with the modified likedVehicles array
        await updateDoc(userRef, {
          likedVehicles: likedVehicles
        });
        return true; // Return true indicating that the vehicle is liked
      }
    } catch (error) {
      throw error; // Throw the error to be handled by createAsyncThunk
    }
  }
);




export const checkIfVehicleLiked = createAsyncThunk(
  'vehicles/checkIfLiked',
  async ({ vehicleId, userId }) => {
    try {
      // Fetch the user's document
      const userRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userRef);

      // Check if the user document exists
      if (!userDocSnapshot.exists()) {
        throw new Error("User not found");
      }

      // Get the liked vehicles array from the user document
      const likedVehicles = userDocSnapshot.data().likedVehicles || [];
      console.log(likedVehicles);
      // Check if the vehicleId exists in the likedVehicles array
      const isLiked = likedVehicles.includes(vehicleId);
      return isLiked;
    } catch (error) {
      throw error;
    }
  }
);



export const fetchLikedVehicles = createAsyncThunk(
  'mywishlist/fetchLikedVehicles',
  async (userId ) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      const likedVehiclesIds = userDocSnap.data().likedVehicles || [];

      const likedVehicles = [];
      for (const vehicleId of likedVehiclesIds) {
        const vehicleDocRef = doc(db, 'vehicles', vehicleId);
        const vehicleDocSnap = await getDoc(vehicleDocRef);
        if (vehicleDocSnap.exists()) {
          likedVehicles.push({ id: vehicleDocSnap.id, ...vehicleDocSnap.data() });
        }
      }

      return likedVehicles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);












const initialState = {
  loading: false,
  error: null,
  vehicles: [],
  onevehicle: null
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitVehicleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitVehicleDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitVehicleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      .addCase(fetchVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.onevehicle = null; // Reset the vehicle state
      })
      .addCase(fetchVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.onevehicle = action.payload; // Set the fetched vehicle data to the state
      })
      .addCase(fetchVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.onevehicle = null; // Reset the vehicle state
      })
      .addCase(fetchVehiclesByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehiclesByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehiclesByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});








export default vehicleSlice.reducer;
