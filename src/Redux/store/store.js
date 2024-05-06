import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';
import vehicleReducer from '../vehicleSlice';
import auctionReducer from '../auctionSlice';
import bidReducer from '../bidSlice';
import commentReducse from '../commentSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    auction:auctionReducer, 
    bid:bidReducer, 
    comments:commentReducse
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
