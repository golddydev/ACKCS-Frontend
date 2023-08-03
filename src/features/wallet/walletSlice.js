import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  connection: null,
  address: null,
};

export const counterSlice = createSlice({
  name: 'wallet',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setConnected: (state, action) => {
      state.connected = true;
      state.address = action.payload;
      console.log("setConnected", state.address)
    },
    setConnection: (state, action) => {
      console.log("setConnection", action.payload)
      state.connection = action.payload;
    },
    disconnected: (state) => {
      state.connected = false;
    },
  },
});

export const connectState = (state) => state.wallet.connected;

export const getConnection = (state) => state.wallet.connection;

export const { setConnected, setConnection, disconnected } = counterSlice.actions;

export default counterSlice.reducer;
