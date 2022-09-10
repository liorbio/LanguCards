import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from 'idb-keyval';

const initialAuthState = { jwt: "" };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setJwtUponLogin(state, action: PayloadAction<{ jwt: string, rememberMe: boolean }>) {
            state.jwt = action.payload.jwt;
            if (action.payload.rememberMe) {
                set('languCardsJwt', state.jwt).then(() => console.log("Saved JWT in localStorage")).catch((err) => console.log(`Error saving JWT in localStorage: ${err}`));
            }
        },
        consumeJwtFromIDB(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
        },
        clearJwt(state) {
            state.jwt = "";
            set('languCardsJwt', "").then(() => console.log("Cleared JWT from localStorage")).catch((err) => console.log(`Error clearing JWT from localStorage: ${err}`));
        }
    }
});

export default authSlice;