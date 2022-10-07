import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../backend-variables/address";
import { packetActions } from "../store/redux-logic";
import { CardType } from "../types/types";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const cardDetailsFetch = (packetId: string, cardId: string, authToken: string) => {
    return fetch(`${backendUrl}/packets/${packetId}/${cardId}`, {
        headers: {
            'auth-token': authToken
        }
    });
};
const postCardFetch = (packetId: string, cardToAdd: CardType, authToken: string) => {
    return fetch(`${backendUrl}/packets/${packetId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': authToken
        },
        body: JSON.stringify(cardToAdd)
    });
};
const updateCardFetch = (packetId: string, cardId: string, cardUpdatedInfo: CardType, authToken: string) => {
    return fetch(`${backendUrl}/packets/${packetId}/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': authToken
        },
        body: JSON.stringify(cardUpdatedInfo)
    });
};

export const useCardMenu = (editMode: boolean) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [searchParams] = useSearchParams(); // for edit mode
    const cardId = searchParams.get('cardid'); // for edit mode
    
    const [showPOSModal, setShowPOSModal] = useState(false);
    const [chosenPOS, setChosenPOS] = useState("");
    const [textStates, setTextStates] = useState({
        term: "",
        definition: "",
        example: "",
        related: "",
        dialect: ""
    });
    const [needsRevision, setNeedsRevision] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [memorization, setMemorization] = useState(0);

    useEffect(() => {
        if (editMode && !!packetId) {
            cardDetailsFetch(packetId, cardId as string, authToken)
                .then((res) => res.json())
                .then((res) => {
                    setChosenPOS(res.pos);
                    setTextStates({
                        term: res.term,
                        definition: res.definition,
                        example: res.example,
                        related: res.related,
                        dialect: res.dialect,
                    })
                    setNeedsRevision(res.needsRevision);
                    setTags(res.tags);
                    setMemorization(res.memorization);
                })
                .catch((err) => console.log(`Error fetching card: ${err}`));
        }
    }, [authToken, editMode, packetId, cardId]);

    const handleChoosePOS = (pos: string) => {
        if (chosenPOS === pos) {
            setChosenPOS("");
        } else {
            setChosenPOS(pos);
        }
        setShowPOSModal(false);
    }
    const toggleNeedsRevision = () => {
        setNeedsRevision(prev => !prev);
    };
    const handleSetMemorization = (level: number) => {
        setMemorization(level);
    };

    const executeSave = () => {
        if (textStates.term.length > 0) {
            if (!editMode) { // new card
                const cardToAdd: CardType = { term: textStates.term, definition: textStates.definition, pos: chosenPOS, example: textStates.example, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                postCardFetch(packetId, cardToAdd, authToken)
                    .then((res) => {
                        console.log(`Added card successfully`);
                        dispatch(packetActions.clearCards());
                        navigate(-1);
                    })
                    .catch((err) => console.log(`Error adding card: ${err}`));
            } else {
                const cardUpdatedInfo: CardType = { term: textStates.term, definition: textStates.definition, pos: chosenPOS, example: textStates.example, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                updateCardFetch(packetId, cardId as string, cardUpdatedInfo, authToken)
                    .then((res) => {
                        console.log(`Edited card successfully`);
                        dispatch(packetActions.clearCards());
                        navigate(-2);
                    })
                    .catch((err) => console.log(`Error editing card: ${err}`));
            }    
        }
    }

    return {
        showPOSModal, setShowPOSModal, handleChoosePOS, chosenPOS, textStates, setTextStates, needsRevision, toggleNeedsRevision, tags, setTags, memorization, handleSetMemorization, executeSave
    };
}