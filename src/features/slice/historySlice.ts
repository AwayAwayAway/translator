import { createSlice } from '@reduxjs/toolkit';
import { FavouriteTranslation } from '../../models';

const initialState: { history: FavouriteTranslation[] } = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory(state, action: { payload: FavouriteTranslation }) {
      state.history = [...state.history, action.payload];
    },
    clearHistory(state) {
      state.history = initialState.history;
    },
  },
});

export const { setHistory, clearHistory } = historySlice.actions;

export default historySlice;
