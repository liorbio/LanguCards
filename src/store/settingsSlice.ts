import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from 'idb-keyval';

const initialSettings = { seenTutorial: false };

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers: {
        seeTutorial(state) {
            state.seenTutorial = true;
            set('seenTutorial', true);
        },
        updateSettingsFromIdb(state, action: PayloadAction<{ seenTutorial: boolean }>) {
            state.seenTutorial = action.payload.seenTutorial;
        }
    }
});

export default settingsSlice;