import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import AddNew from '../../UI/AddNew';
import { ClickBelow } from '../../../generatedIcons';
import classes from './Packet.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UIEvent } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LanguCoupon from './LanguCoupon';
import LanguListItem from './LanguListItem';
import portalElement from '../../../elements/portalElement';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { useCards } from '../../../hooks/useCards';

const Packet = () => {
    const { loading, packetIsEmpty, blockLoadMore, loadMoreCardsFetch } = useCards();

    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const cards = useAppSelector(state => state.packet.cards);
    const packetDir = useAppSelector(state => state.packet.packetDir);

    const lang = params.language;

    const handleGoToAddNewCard = () => {
        navigate('./add');
    }

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
            loadMoreCardsFetch();
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