import { createSlice } from '@reduxjs/toolkit';

const initialState: { isLightMode: boolean } = { isLightMode: true };

const styleModeSLice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    toggleStyleMode(state) {
      state.isLightMode = !state.isLightMode;
    },
  },
});

export const { toggleStyleMode } = styleModeSLice.actions;

export default styleModeSLice;
