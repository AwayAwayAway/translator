import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { translatorApi } from '../features/api/translatorApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [translatorApi.reducerPath]: translatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(translatorApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
