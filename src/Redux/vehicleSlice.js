import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, collection, query, getDocs, addDoc, updateDoc, getDoc, where, arrayUnion, deleteDoc, arrayRemove } from 'firebase/firestore';
import { db, storage } from '../config/firebase';



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

export const fetchVehiclesWithUsers = createAsyncThunk(
  'vehicles/fetchWithUsers',
  async () => {
    try {
      const vehiclesSnapshot = await getDocs(collection(db, 'vehicles'));
      const vehiclesWithUsers = await Promise.all(
        vehiclesSnapshot.docs.map(async (vehicleDoc) => {
          const vehicleData = vehicleDoc.data();
          const userDocRef = doc(db, 'users', vehicleData.userId);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            return {
              vehicleId: vehicleDoc.id,
              ...vehicleData,
              userId: vehicleData.userId,
              userName: userData.name,
              userEmail: userData.email,
            };
          } else {
            throw new Error(`User document not found for vehicle ${vehicleDoc.id}`);
          }
        })
      );
      return vehiclesWithUsers;
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
  async ({ vehicleData, vehiclePhotos, userId, idProof, startingBid, agreeToTerms, stage, vehicleId }) => {
    try {
      let vehicleIdResult;
      if (stage === 7) {
        try {
          if (startingBid !== undefined && agreeToTerms) {
            const userVehiclesQuery = query(collection(db, 'auctions'), where('vehicleId', '==', vehicleId));

            const vehicleDocSnap = await getDoc(doc(db, 'vehicles', vehicleId));
            if (vehicleDocSnap.exists()) {
              const parsedStartingBid = parseFloat(startingBid);
              await updateDoc(doc(db, 'vehicles', vehicleId), {
                startingBid: parsedStartingBid,
                agreeToTerms: agreeToTerms,
                auctionStatus: true,
              });
              const endTime = new Date();
              endTime.setDate(endTime.getDate() + 7);


              const auctionQuerySnapshot = await getDocs(userVehiclesQuery);
              auctionQuerySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                  auctionStatus: true,
                  endTime: endTime,

                });
              });

              vehicleIdResult = vehicleId;
            } else {
              throw new Error('Vehicle document does not exist.');
            }
          } else {
            throw new Error('Starting bid is undefined or empty.');
          }
        } catch (error) {
          console.error('Error updating vehicle document:', error.message);
        }

      } else if (stage === 4) {
        const photoUrls = await Promise.all(vehiclePhotos.map(async (photoFile) => {
          const photoRef = ref(storage, `vehiclePhotos/${userId}/${photoFile.name}`);
          await uploadBytes(photoRef, photoFile);
          return getDownloadURL(photoRef).catch(error => { throw error; }); 
        }));

        const idProofRef = ref(storage, `idProofs/${userId}/${idProof.name}`);
        await uploadBytes(idProofRef, idProof);
        const idProofUrl = await getDownloadURL(idProofRef).catch(error => { throw error; }); 
        console.log(vehicleData);
        const vehicleDocRef = await addDoc(collection(db, 'vehicles'), {
          userId,
          idProof: idProofUrl,
          ...vehicleData,
          vehiclePhotos: photoUrls,
          safetyRating: "",
          startingBid: 0,
          travelDistance:Number(vehicleData.travelDistance) || 0,
          auctionStatus: false,
          evaluationDone: "PENDING",
          adminApprove: "PENDING",
          createdAt: new Date(),
        });

        vehicleIdResult = vehicleDocRef.id;

        await updateDoc(doc(db, 'users', userId), {
          submittedVehicleId: arrayUnion(vehicleIdResult),
        });



        const auctionDoc = await addDoc(collection(db, 'auctions'), {
          vehicleId: vehicleIdResult,
          userId,
          auctionStatus: false,
          createdAt: new Date(),
        });
        const vehicleDoc = await getDoc(doc(db, 'vehicles', vehicleIdResult));
        if (vehicleDoc.exists()) {
          await updateDoc(vehicleDoc.ref, {
            auctionId: auctionDoc.id,
          });
        } else {
          console.error('Vehicle document not found');
        }
      }

      return { vehicleId: vehicleIdResult };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);






export const fetchVehicle = createAsyncThunk(
  'auction/fetchVehicle',
  async (vehicleId) => {
    try {
      const vehicleDoc = await getDoc(doc(db, 'vehicles', vehicleId.vehicleId));
      if (!vehicleDoc.exists()) {
        throw new Error('Vehicle not found');
      }

      const vehicleData = vehicleDoc.data();
      const id = vehicleDoc.id;

      vehicleData.id = id;

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
      const userAuctionsQuery = query(collection(db, 'auctions'), where('userId', '==', userId));
      const userAuctionsSnapshot = await getDocs(userAuctionsQuery);
      const userSubmittedVehicles = [];

      for (const auctionDoc of userAuctionsSnapshot.docs) {
        const auctionData = auctionDoc.data();
        const auctionId = auctionDoc.id;
        console.log(auctionId);

        // Fetch bids for this auction
        const bidsQuerySnapshot = await getDocs(collection(db, `auctions/${auctionId}/bids`));
        const auctionBids = bidsQuerySnapshot.docs.map(bidDoc => ({ id: bidDoc.id, ...bidDoc.data() }));

        auctionBids.sort((a, b) => b.amount - a.amount);


        // Fetch vehicle data
        const vehicleDoc = await getDoc(doc(db, 'vehicles', auctionData.vehicleId));
        const vehicleData = vehicleDoc.data();
        console.log(auctionData.vehicleId);

        userSubmittedVehicles.push({ id: auctionData.vehicleId, ...vehicleData, bids: auctionBids });
      }
      console.log(userSubmittedVehicles);

      return userSubmittedVehicles;
    } catch (error) {
      throw error;
    }
  }
);


export const searchVehicles = (searchTerm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryRef = collection(db, 'vehicles');
      const querySnapshot = await getDocs(
        query(
          queryRef,
          where('brand', '>=', searchTerm),
          where('brand', '<', searchTerm.toLowerCase() + '\uf8ff')
        )
      );

      const searchResults = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        if (data.brand.toLowerCase().startsWith(searchTerm.toLowerCase())) {
          searchResults.push({ id: doc.id, ...data });
        }
      });

      console.log('Search result:', searchResults);
      resolve(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
      reject(error);
    }
  });
};






export const fetchUserSubmittedVehiclesbutnotonAuction = createAsyncThunk(
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


export const updateAdminVehicleStatus = createAsyncThunk(
  'vehicles/updateStatus',
  async ({ vehicleId, status }, { rejectWithValue }) => {
    try {
      const vehicleDocRef = doc(db, 'vehicles', vehicleId);

      const vehicleDocSnapshot = await getDoc(vehicleDocRef);
      if (!vehicleDocSnapshot.exists()) {
        throw new Error('Vehicle not found');
      }

      await updateDoc(vehicleDocRef, {
        adminApprove: status
      });

      return { vehicleId, status };
    } catch (error) {
      console.error('Error updating vehicle status:', error.message);
      return rejectWithValue(error.message);
    }
  }
);




export const updateVehicleDetails = createAsyncThunk(
  'vehicles/updateDetails',
  async ({ vehicleId, updatedData, idProofEvaluterPanel }, { rejectWithValue }) => {
    try {
      console.log(updatedData);
      const vehicleDocRef = doc(db, 'vehicles', vehicleId);

      // Fetch the existing vehicle document
      const vehicleDocSnapshot = await getDoc(vehicleDocRef);
      if (!vehicleDocSnapshot.exists()) {
        throw new Error('Vehicle not found');
      }

      const existingVehicleData = vehicleDocSnapshot.data();
      const existingPhotoUrls = existingVehicleData.vehiclePhotos || [];

      // Upload vehicle photos to Firebase Storage
      let newPhotoUrls = [];
      if (updatedData?.vehiclePhotos) {
        const uploadPromises = updatedData.vehiclePhotos.map(async (file) => {
          console.log(file);
          const storageRef = ref(storage, `vehiclePhotos/${vehicleId}/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
        });
        newPhotoUrls = await Promise.all(uploadPromises);
      }

      const updatedPhotoUrls = [...existingPhotoUrls, ...newPhotoUrls];
      let updatedIdProofUrl = existingVehicleData.idProof;

      // Upload ID proof to Firebase Storage
      if (idProofEvaluterPanel && updatedData?.idProof) {
        const idProofRef = ref(storage, `idProofs/${vehicleId}/${updatedData.idProof.name}`);

        // If an existing ID proof URL exists, delete the existing file from Firebase Storage
        if (existingVehicleData.idProof) {
          const existingIdProofRef = ref(storage, existingVehicleData.idProof);
          await deleteObject(existingIdProofRef).catch((error) => {
            console.error('Error deleting existing ID proof:', error);
          });
        }

        // Upload the new ID proof
        await uploadBytes(idProofRef, idProofEvaluterPanel.idProof);
        updatedIdProofUrl = await getDownloadURL(idProofRef);
      }

      console.log(updatedIdProofUrl);

      // Update the vehicle document in Firestore with new data
      await updateDoc(vehicleDocRef, {
        ...updatedData,
        vehiclePhotos: updatedPhotoUrls,
        idProof: updatedIdProofUrl,
      });

      return { vehicleId, ...updatedData, vehiclePhotos: updatedPhotoUrls, idProof: updatedIdProofUrl };
    } catch (error) {
      console.error('Error updating vehicle details:', error.message);
      return rejectWithValue(error.message);
    }
  }
);



export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async ({ vehicleId, userId }, { rejectWithValue }) => {
    try {
      console.log(vehicleId, userId);
      console.log(`Deleting vehicle with ID: ${vehicleId},${userId}`);
      const vehicleDocRef = doc(db, 'vehicles', vehicleId);
      const vehicleDocSnapshot = await getDoc(vehicleDocRef);

      if (!vehicleDocSnapshot.exists()) {
        console.log('Vehicle not found');
        throw new Error('Vehicle not found');
      }

      const vehicleData = vehicleDocSnapshot.data();

      // Delete vehicle photos from storage
      const photoDeletionPromises = vehicleData.vehiclePhotos.map((photoUrl) => {
        const photoRef = ref(storage, photoUrl);
        return deleteObject(photoRef);
      });
      await Promise.all(photoDeletionPromises);

      // Delete ID proof from storage
      const idProofRef = ref(storage, vehicleData.idProof);
      await deleteObject(idProofRef);

      // Delete vehicle document from Firestore
      await deleteDoc(vehicleDocRef);

      // Query and delete related auction documents from Firestore
      const auctionQuery = query(collection(db, 'auctions'), where('vehicleId', '==', vehicleId));
      const auctionSnapshot = await getDocs(auctionQuery);

      const auctionDeletionPromises = auctionSnapshot.docs.map((auctionDoc) =>
        deleteDoc(auctionDoc.ref)
      );
      await Promise.all(auctionDeletionPromises);

      // Remove vehicleId from submittedVehicleId array in user document
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        submittedVehicleId: arrayRemove(vehicleId)
      });

      return { vehicleId };
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      return rejectWithValue(error.message);
    }
  }
);







export const fetchVehiclesByFilter = createAsyncThunk(
  'vehicles/fetchByFilter',
  async (filterCriteria) => {
    try {
      let {
        brand = [],
        distanceTraveled = [],
        fuelType = [],
        vehicleType = [],
        transmission=[],
        maxPrice,
        minPrice,
        city
      } = filterCriteria || {};
      const brandValues = brand?.map(value => value.toLowerCase());
      const fuelTypeValues = fuelType?.map(value => value.toLowerCase());
      const vehicleTypeValues = vehicleType?.map(value => value.toLowerCase());

      let queryRef = collection(db, 'vehicles');
      // Add conditions for brand, distance traveled, fuel type, and vehicle type
      if (brandValues.length > 0) {
        queryRef = query(queryRef, where('brand', 'in', brandValues));
      }
      if (distanceTraveled.length > 0) {
        let finalminDistance=Number.MAX_SAFE_INTEGER;
        let finalmaxDistance=0;
        distanceTraveled.forEach(range => {
          const [minDistance, maxDistance] = range.split('-');
          if (maxDistance>finalmaxDistance) {
            finalmaxDistance=maxDistance
          }
          if (minDistance<finalminDistance) {
            finalminDistance=minDistance
          }
          console.log(minDistance,maxDistance);
        });
        console.log(finalminDistance,finalmaxDistance);
          queryRef = query(queryRef, where('travelDistance', '>=', parseInt(finalminDistance)), where('travelDistance', '<=', parseInt(finalmaxDistance)));
          queryRef = query(queryRef, where('travelDistance', '>=', parseInt(finalminDistance)));
      }
      if (fuelTypeValues.length > 0) {
        queryRef = query(queryRef, where('fuelType', 'in', fuelType));
      }
      if (vehicleTypeValues.length > 0) {
        queryRef = query(queryRef, where('vehicleType', 'in', vehicleTypeValues));
      }
      if (transmission.length > 0) {
        queryRef = query(queryRef, where('transmission', 'in', transmission));
      }
      if (city) {
        queryRef = query(queryRef, where('city', '>=', city), where('city', '<', city + '\uf8ff'));
      }

      // Add conditions for price range
      if (!!minPrice  && !!maxPrice ) {
        console.log(minPrice,maxPrice);
        queryRef = query(queryRef, where('startingBid', '>=', minPrice), where('startingBid', '<=', maxPrice));
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
      const isLiked = likedVehicles.includes(vehicleId);
      return isLiked;
    } catch (error) {
      throw error;
    }
  }
);



export const fetchLikedVehicles = createAsyncThunk(
  'mywishlist/fetchLikedVehicles',
  async (userId) => {
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
