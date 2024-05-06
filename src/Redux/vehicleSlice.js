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


export const submitVehicleDetails = createAsyncThunk(
  'vehicles/submitToFirebase',
  async ({ vehicleData, vehiclePhotos, userId, idProof }) => {
    try {

      const photoUrls = await Promise.all(vehiclePhotos.map(async (photoFile) => {
        const photoRef = ref(storage, `vehiclePhotos/${userId}/${photoFile.name}`);
        await uploadBytes(photoRef, photoFile);
        return getDownloadURL(photoRef);
      }));

      const idProofRef = ref(storage, `idProofs/${userId}/${idProof.name}`);
      await uploadBytes(idProofRef, idProof);
      const idProofUrl = await getDownloadURL(idProofRef);

      const vehicleDocRef = await addDoc(collection(db, 'vehicles'), {
        userId,
        idProof: idProofUrl,
        name: vehicleData.name,
        mobile: vehicleData.mobile,
        address: vehicleData.address,
        registrationYear: vehicleData.registrationYear,
        brand: vehicleData.brand,
        model: vehicleData.model,
        travelDistance: vehicleData.travelDistance,
        transmission: vehicleData.transmission,
        ownerType: vehicleData.ownerType,
        carLocation: vehicleData.carLocation,
        modification: vehicleData.modification,
        pickupLocation: vehicleData.pickupLocation,
        vehiclePhotos: photoUrls,
        evalution:false,
        createdAt: new Date(),
      });


      const vehicleId = vehicleDocRef.id;
      await updateDoc(doc(db, 'users', userId), {
        submittedVehicleId: arrayUnion(vehicleId),
      });

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
