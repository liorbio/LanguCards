import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import packetSlice from './packetSlice';
import settingsSlice from './settingsSlice';


const store = configureStore({
    reducer: { settings: settingsSlice.reducer,
               packet: packetSlice.reducer,
               auth: authSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const packetActions = packetSlice.actions;
export const settingsActions = settingsSlice.actions;
export const authActions = authSlice.actions;
export default store;