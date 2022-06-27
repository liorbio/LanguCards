import { configureStore } from '@reduxjs/toolkit';
import packetsSlice from './packetsSlice';


const store = configureStore({
    reducer: { packets: packetsSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const packetsActions = packetsSlice.actions;
export default store;