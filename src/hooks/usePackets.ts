import { useEffect, useState } from "react";
import { backendUrl } from "../backend-variables/address";
import { boxActions, packetActions, searchActions } from "../store/redux-logic";
import { PacketType } from "../types/types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const usePackets = () => {
    const authToken = useAppSelector(state => state.auth.jwt);
    const dispatch = useAppDispatch();
    const packets = useAppSelector(state => state.box.packets);
    const [forcedReload, setForcedReload] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        // Clear cards of last viewed packet
        dispatch(packetActions.clearCards());
        dispatch(searchActions.clearSearch());
        // fetch packets
        fetch(`${backendUrl}/packets`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => dispatch(boxActions.setPackets(res)))
            .catch((err) => {
                setError("Error fetching packets");
                console.log(`Error fetching packets: ${err}`);
            });
    }, [authToken, forcedReload, dispatch]);

    const performForcedReload = () => {
        setForcedReload(prev => !prev);
    }

    return {
        packets, performForcedReload, error
    }
}