import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from 'idb-keyval';

const initialAuthState: { jwt: string, jwtExpiryDate: null | number } = { jwt: "", jwtExpiryDate: null };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setJwtUponLogin(state, action: PayloadAction<{ jwt: string, jwtExpiryDate: null | number }>) {
            state.jwt = action.payload.jwt;
            state.jwtExpiryDate = action.payload.jwtExpiryDate;
            set('languCardsJwt', state.jwt).then(() => console.log("Saved JWT in localStorage")).catch((err) => console.log(`Error saving JWT in localStorage: ${err}`));
            if (action.payload.jwtExpiryDate) {
                set('languCardsJwtExpiryDate', state.jwtExpiryDate).then(() => console.log("Saved JWT expiration date in local storage")).catch((err) => console.log(`Error saving JWT expiration date in local storaget: ${err}`));
            }
        },
        consumeJwtFromIDB(state, action: PayloadAction<{ jwt: string, jwtExpiryDate: null | number }>) {
            state.jwt = action.payload.jwt;
            state.jwtExpiryDate = action.payload.jwtExpiryDate;
        },
        clearJwt(state) {
            state.jwt = "";
            set('languCardsJwt', "").then(() => console.log("Cleared JWT from localStorage")).catch((err) => console.log(`Error clearing JWT from localStorage: ${err}`));
            set('languCardsJwtExpiryDate', "").then(() => console.log("Cleared JWT expiry date from localStorage")).catch((err) => console.log(`Error clearing JWT expiry date from localStorage: ${err}`));
        }
    }
});

export default authSlice;