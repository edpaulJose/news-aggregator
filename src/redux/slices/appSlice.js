import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: false,
  country: import.meta.env.VITE_DEFAULT_COUNTRY,
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const { setLoading, setCountry } = appSlice.actions;
export default appSlice.reducer;
