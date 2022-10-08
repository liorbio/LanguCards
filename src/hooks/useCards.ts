import { useEffect, useState } from "react";
import { backendUrl } from "../backend-variables/address";
import { delimitBySemicolon } from "../helpers/functions";
import { packetActions } from "../store/redux-logic";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const getCardsPromise = async (url: string, authToken: string) => {
    return fetch(url, {
        headers: {
            'auth-token': authToken
        }
    }).then((res) => res.json())
};

export const useCards = () => {
    const dispatch = useAppDispatch();
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [packetIsEmpty, setPacketIsEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const searchCriteriaOn = useAppSelector(state => {
        if (state.search.searchVal.length > 0) return true;
        if (state.search.nrFilter === 1) return true;
        if (state.search.diaFilter.length > 0 || state.search.memoFilter.length > 0 || state.search.posFilter.length > 0 || state.search.tagsFilter.length > 0) return true;
        return false;
    });
    const searchVal = useAppSelector(state => state.search.searchVal);
    const sortBy = useAppSelector(state => {
        let sortBy = state.search.selectedSorter === "alphabetical" ? "term" : "date";
        if ((state.search.selectedSorter === "alphabetical" && state.search.sortAlphabetically === -1) || (state.search.selectedSorter === "date" && state.search.sortByDate === -1)) {
            sortBy = `-${sortBy}`;
        }
        return sortBy;
    });
    const posFilter = useAppSelector(state => delimitBySemicolon(state.search.posFilter));
    const tagsFilter = useAppSelector(state => delimitBySemicolon(state.search.tagsFilter));
    const diaFilter = useAppSelector(state => delimitBySemicolon(state.search.diaFilter));
    const memoFilter = useAppSelector(state => delimitBySemicolon(state.search.memoFilter));
    const nrFilter = useAppSelector(state => state.search.nrFilter.toString());

    let fullPath = `${backendUrl}/packets/${packetId}/cards?sort=${sortBy}&nrfilter=${nrFilter}`
    if (searchVal) fullPath += `&search=${searchVal}`;
    if (posFilter) fullPath += `&posfilter=${posFilter}`;
    if (tagsFilter) fullPath += `&tagsfilter=${tagsFilter}`;
    if (diaFilter) fullPath += `&diafilter=${diaFilter}`;
    if (memoFilter) fullPath += `&memofilter=${memoFilter}`;

    const [blockLoadMore, setBlockLoadMore] = useState(false);

    useEffect(() => {
        if (!!packetId) {
            getCardsPromise(fullPath, authToken)
                .then((res) => {
                    setLoading(false);
                    if (!searchCriteriaOn && res.length === 0) {
                        setPacketIsEmpty(true);
                    } else {
                        dispatch(packetActions.loadCards(res));
                    }
                })
                .catch((err) => console.log(`Error loading cards: ${err}`));
        }
    }, [dispatch, packetId, authToken, fullPath, searchCriteriaOn]);

    const loadMoreCardsFetch = () => {
        getCardsPromise(`${fullPath}&page=${pageNumber}`, authToken)
            .then((res) => {
                if (res.length > 0) {
                    dispatch(packetActions.loadMoreCards(res));
                    setPageNumber(prev => prev + 1);
                } else {
                    setBlockLoadMore(true);
                }
            })
            .catch((err) => console.log(`Error loading more cards: ${err}`));
    };

    return {
        loading, packetIsEmpty, blockLoadMore, loadMoreCardsFetch
    };
};