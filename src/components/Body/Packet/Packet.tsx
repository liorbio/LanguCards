import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import AddNew from '../../UI/AddNew';
import { ClickBelow } from '../../../generatedIcons';
import classes from './Packet.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UIEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LanguCoupon from './LanguCoupon';
import LanguListItem from './LanguListItem';
import portalElement from '../../../elements/portalElement';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { packetActions } from '../../../store/redux-logic';
import { delimitBySemicolon } from "../../../helpers/functions";
import { backendUrl } from '../../../backend-variables/address';

const Packet = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const cards = useAppSelector(state => state.packet.cards);
    const packetDir = useAppSelector(state => state.packet.packetDir);
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
    const lang = params.language;

    const handleGoToAddNewCard = () => {
        navigate('./add');
    }

    useEffect(() => {
        if (!!packetId) {
            fetch(`${fullPath}`, {
                headers: {
                    'auth-token': authToken
                }
            })
                .then((res) => res.json())
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

    const emptyPacket = (
        <>
            <div style={{ gridRow: 1 }}>
            <h1 style={{ marginBlock: 0 }}>{lang![0].toUpperCase()+lang!.slice(1)}</h1>
            {t('add_card')}</div>
            <ClickBelow />
        </>
    );
    const populatedPacket = ( // list of coupons -- according to query params
        <>
            {searchParams.get('show') === "coupons" && cards.map(c => <LanguCoupon key={c._id as string} cardId={c._id as string} term={c.term} needsRevision={c.needsRevision} />)}
            {searchParams.get('show') === "list" && cards.map(c => <LanguListItem key={c._id as string} cardId={c._id as string} term={c.term} definition={c.definition} pos={c.pos} needsRevision={c.needsRevision} packetDir={packetDir} />)}
        </>
    );

    let scrollThrottler = true;
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        if (scrollThrottler && !blockLoadMore && (event.currentTarget.scrollHeight - event.currentTarget.scrollTop < event.currentTarget.clientHeight + 100)) {
            scrollThrottler = false;
            fetch(`${fullPath}&page=${pageNumber}`, {
                headers: {
                    'auth-token': authToken
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.length > 0) {
                        dispatch(packetActions.loadMoreCards(res));
                        setPageNumber(prev => prev + 1);
                    } else {
                        setBlockLoadMore(true);
                    }
                })
                .catch((err) => console.log(`Error loading more cards: ${err}`));
        }
    }

    return (
        <div className={`${classes.packet} ${packetIsEmpty ? classes.emptyPacket : classes.populatedPacket}`} style={searchParams.get('show') === "coupons" ? { display: "flex", flexDirection: "row", flexWrap: "wrap" } : {}} onScroll={handleScroll}>
            {(!loading && packetIsEmpty) && emptyPacket}
            {(!loading && !packetIsEmpty) && populatedPacket}
            {!loading && ReactDOM.createPortal(<AddNew handler={handleGoToAddNewCard} />, portalElement)}
            {loading && <LoadingSpinner />}
        </div>
    )
};

export default Packet;