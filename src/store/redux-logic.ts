import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import packetsSlice from './packetsSlice';
import settingsSlice from './settingsSlice';


const store = configureStore({
    reducer: { packets: packetsSlice.reducer,
               settings: settingsSlice.reducer,
               auth: authSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const packetsActions = packetsSlice.actions;
export const settingsActions = settingsSlice.actions;
export const authActions = authSlice.actions;
export default store;