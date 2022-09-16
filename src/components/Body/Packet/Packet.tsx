import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import AddNew from '../../UI/AddNew';
import { ClickBelow } from '../../../generatedIcons';
import classes from './Packet.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LanguCoupon from './LanguCoupon';
import LanguListItem from './LanguListItem';
import portalElement from '../../../elements/portalElement';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { packetActions } from '../../../store/redux-logic';

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
    const [showEmptyPacket, setShowEmptyPacket] = useState(false);
    const [loading, setLoading] = useState(true);
    const lang = params.language;

    const handleGoToAddNewCard = () => {
        navigate('./add');
    }

    useEffect(() => {
        if (!!packetId) {
            fetch(`/packets/${packetId}/cards`, {
                headers: {
                    'auth-token': authToken
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false);
                    if (res.length > 0) {
                        dispatch(packetActions.loadCards(res));
                    } else {
                        setShowEmptyPacket(true);
                    }
                })
                .catch((err) => console.log(`Error loading cards: ${err}`));
        }
    }, [cards.length, dispatch, packetId, authToken]);

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
            {searchParams.get('show') === "coupons" && cards.map(c => <LanguCoupon key={c.term+new Date().getTime()} cardId={c._id as string} term={c.term} needsRevision={c.needsRevision} />)}
            {searchParams.get('show') === "list" && cards.map(c => <LanguListItem key={c.term+new Date().getTime()} cardId={c._id as string} term={c.term} definition={c.definition} pos={c.pos} needsRevision={c.needsRevision} packetDir={packetDir} />)}
        </>
    );
    return (
        <div className={`${classes.packet} ${showEmptyPacket ? classes.emptyPacket : classes.populatedPacket}`}>
            {(!loading && showEmptyPacket) && emptyPacket}
            {(!loading && !showEmptyPacket) && populatedPacket}
            {!loading && ReactDOM.createPortal(<AddNew handler={handleGoToAddNewCard} />, portalElement)}
            {loading && <LoadingSpinner />}
        </div>
    )
};

export default Packet;