// src/redux/mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    selectedRegion: null,
  },
  reducers: {
    setRegion: (state, action) => {
      state.selectedRegion = action.payload||null;
    },
  },
});

export const { setRegion } = mapSlice.actions;
export default mapSlice.reducer;
