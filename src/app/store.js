import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import walletReducer from '../features/wallet/walletSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});
