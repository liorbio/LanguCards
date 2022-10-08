import { backendUrl } from "../backend-variables/address";
import { PacketType } from "../types/types";

export const addPacketPromise = (authToken: string, packet: PacketType) => {
    return fetch(`${backendUrl}/packets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': authToken
        },
        body: JSON.stringify({ language: packet.language, writingDir: packet.dir })
    });
}