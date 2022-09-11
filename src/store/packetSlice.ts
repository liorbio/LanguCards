import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../types/types";

const initialPacket: { packetId: string, packetDir: "ltr" | "rtl", cards: CardType[] } = { packetId: "", packetDir: "ltr", cards: [] };

const packetSlice = createSlice({
    name: 'packet',
    initialState: initialPacket,
    reducers: {
        setPacketDetails(state, action: PayloadAction<{ packetId: string, packetDir: "ltr" | "rtl" }>) {
            state.packetDir = action.payload.packetDir;
            state.packetId = action.payload.packetId;
        },
        loadCards(state, action: PayloadAction<CardType[]>) {
            state.cards = action.payload;
        },
        loadMoreCards(state, action: PayloadAction<CardType[]>) {
            state.cards.push(...action.payload);
        },
        clearCards(state) {
            state.cards = [];
        }
    }
});

export default packetSlice;