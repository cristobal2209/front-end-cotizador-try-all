import { configureStore, createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: null,
  reducers: {
    setCredentials: (state, action) => action.payload,
  },
});

export const store = configureStore({
  reducer: {
    credentials: credentialsSlice.reducer,
  },
});

export const { setCredentials } = credentialsSlice.actions;
