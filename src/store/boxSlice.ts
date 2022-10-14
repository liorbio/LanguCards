import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PacketType } from "../types/types";

const initialBox: { packets: PacketType[] | null } = { packets: null };

const boxSlice = createSlice({
    name: 'packet',
    initialState: initialBox,
    reducers: {
        setPackets(state, action: PayloadAction<PacketType[]>) {
            state.packets = action.payload;
        }
    }
});

export default boxSlice;