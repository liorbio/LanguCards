import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, PacketType } from "../types/types";



const initialPackets: PacketType[] = [];

const packetsSlice = createSlice({
    name: 'packets',
    initialState: initialPackets,
    reducers: {
        addPacket(state, action: PayloadAction<PacketType>) {
            state.push(action.payload);
            // set via idb-keyval
        },
        addCardToPacket(state, action: PayloadAction<{ packetLanguage: string, card: CardType }>) {
            state.find(p => p.language === action.payload.packetLanguage)?.cards.push(action.payload.card);
            // set via idb-keyval
        },
        updateMemorization(state, action: PayloadAction<{ packetLanguage: string, cardId: string, newMemorization: number }>) {
            const { packetLanguage, cardId, newMemorization } = action.payload;
            const relevantCard = state.find(p => p.language === packetLanguage)?.cards.find(c => c.cardId === cardId);
            if (relevantCard) {
                relevantCard.memorization = newMemorization;
            }
        }
    }
});

export default packetsSlice;