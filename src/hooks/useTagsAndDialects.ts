import { useEffect, useState } from "react";
import { backendUrl } from "../backend-variables/address";
import { useAppSelector } from "./reduxHooks";

export const useTagsAndDialects = () => {
    const authToken = useAppSelector(state => state.auth.jwt);
    const packetId = useAppSelector(state => state.packet.packetId);
    const [tags, setTags] = useState([]);
    const [dialects, setDialects] = useState([]);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetch(`${backendUrl}/packets/${packetId}/tags-and-dialects`, {
            method: 'GET',
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setTags(res.tags);
                setDialects(res.dialects);
            }).catch((err) => {
                setError("Error fetchin dialects and tags");
                console.log(`Error fetching dialects and tags: ${err}`)
            });
    }, [packetId, authToken]);

    return { tags, dialects, error };
};