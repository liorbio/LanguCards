import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { backendUrl } from "../backend-variables/address";
import { searchActions } from "../store/redux-logic";
import { CardType } from "../types/types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useCard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cardId = searchParams.get('cardid');
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [card, setCard] = useState<CardType | null>(null);
    const [currentMemorization, setCurrentMemorization] = useState<number | null>(null);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        fetch(`${backendUrl}/packets/${packetId}/${cardId}`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setCard(res);
                setCurrentMemorization(res.memorization);
            })
            .catch((err) => console.log(`Error fetching card: ${err}`));
    }, [packetId, cardId, authToken]);

    const handleChangeMemorization = (level: number) => {
        setCurrentMemorization(level);
    };

    const updateMemorizationPromise = async (card: CardType) => {
        const { term, definition, pos, example, needsRevision, tags, related, dialect } = card;
        return fetch(`${backendUrl}/packets/${packetId}/${searchParams.get('cardid')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ term, definition, pos, example, needsRevision, tags, related, dialect, memorization: currentMemorization })
        })
            .catch((err) => {
                setError('Card update failed');
                console.log(`Card update failed`);
            });
    }

    const searchByTag = (tag: string) => {
        dispatch(searchActions.clearSearch());
        dispatch(searchActions.pressOnTag(tag));
        navigate(-1);
    }


    return {
        card, cardId, currentMemorization, handleChangeMemorization, updateMemorizationPromise, searchByTag, error
    }
};