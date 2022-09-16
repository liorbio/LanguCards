import { createSlice } from "@reduxjs/toolkit";

const initialSettings = { seenTutorial: false };

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers: {
        seeTutorial(state) {
            state.seenTutorial = true;
        }
    }
});

export default settingsSlice;