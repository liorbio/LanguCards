import { configureStore } from '@reduxjs/toolkit';
import packetsSlice from './packetsSlice';
import settingsSlice from './settingsSlice';


const store = configureStore({
    reducer: { packets: packetsSlice.reducer,
               settings: settingsSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const packetsActions = packetsSlice.actions;
export const settingsActions = settingsSlice.actions;
export default store;