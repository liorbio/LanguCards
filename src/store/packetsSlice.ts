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
        },
        updateCard(state, action: PayloadAction<{ packetLanguage: string, newCardInfo: CardType }>) {
            const foundCard = state.find(p => p.language === action.payload.packetLanguage)!.cards.find(c => c.cardId === action.payload.newCardInfo.cardId)!;
            foundCard.term = action.payload.newCardInfo.term;
            foundCard.definition = action.payload.newCardInfo.definition;
            foundCard.pos = action.payload.newCardInfo.pos;
            foundCard.usage = action.payload.newCardInfo.usage;
            foundCard.needsRevision = action.payload.newCardInfo.needsRevision;
            foundCard.tags = action.payload.newCardInfo.tags;
            foundCard.related = action.payload.newCardInfo.related;
            foundCard.dialect = action.payload.newCardInfo.dialect;
            foundCard.memorization = action.payload.newCardInfo.memorization;
        },
        deleteCard(state, action: PayloadAction<{ packetLanguage: string, cardId: string }>) {
            const packet = state.find(p => p.language === action.payload.packetLanguage)!;
            packet.cards = packet.cards.filter(c => c.cardId !== action.payload.cardId);
        }
    }
});

export default packetsSlice;