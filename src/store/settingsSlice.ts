import { createSlice } from "@reduxjs/toolkit";
import { set } from 'idb-keyval';

const initialSettings = { seenTutorial: false };

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers: {
        seeTutorial(state) {
            state.seenTutorial = true;
            set('languCardsSeenTutorial', true).then(() => console.log("Set seenTutorial to 'true' in localStorage")).catch((err) => console.log(`Error setting seenTutorial to 'true' in localStorage: ${err}`));
        },
        clearSeenTutorialFromIDBUponLogout(state) {
            state.seenTutorial = false;
            set('languCardsSeenTutorial', null).then(() => console.log("Cleared seenTutorial from localStorage")).catch((err) => console.log(`Error clearing seenTutorial from localStorage: ${err}`));
        }
    }
});

export default settingsSlice;