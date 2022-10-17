import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const { card, cardIndexInList } = useAppSelector(state => {
        const card = state.packet.cards.filter(c => c._id === cardId)[0];
        const cardIndexInList = state.packet.cards.findIndex(c => c._id === cardId);
        return { card, cardIndexInList }
    });
    const prevCardId: string | null = useAppSelector(state => {
        if (cardIndexInList === 0) return null;
        return state.packet.cards[cardIndexInList - 1]._id!;
    });
    const nextCardId: string | null = useAppSelector(state => {
        if (cardIndexInList === state.packet.cards.length-1) return null;
        return state.packet.cards[cardIndexInList + 1]._id!;
    })
    const [currentMemorization, setCurrentMemorization] = useState<number>(card.memorization);
    const [error, setError] = useState<null | string>(null);

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
            .then(() => {
                dispatch(searchActions.searchIsStale());
                return null;
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
        card, cardId, prevCardId, nextCardId, currentMemorization, handleChangeMemorization, updateMemorizationPromise, searchByTag, error
    }
};