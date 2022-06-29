import ReactDOM from 'react-dom';
import AddNew from '../AddNew';
import ClickBelow from '../../../icons/ClickBelow.png';
import classes from './Packet.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LanguCoupon from './LanguCoupon';
import LanguListItem from './LanguListItem';
import portalElement from '../../../elements/portalElement';

const Packet = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const lang = params.language;

    // Either get packet from Redux or lazy-load from Mongo
    const packet = useAppSelector(state => state.packets.find(p => p.language === lang));
    const handleGoToAddNewCard = () => {
        navigate('./add');
    }

    useEffect(() => {
        if (!packet) {
            navigate('/');
        }
    }, [navigate, packet]);

    const emptyPacket = (
        <>
            <div style={{ gridRow: 1 }}>
            <h1>{lang![0].toUpperCase()+lang!.slice(1)}</h1>
            Add words to your packet!</div>
            <img style={{ marginLeft: "3rem", gridRow: 2, height: "47vh" }} src={ClickBelow} alt="click on bottom right corner" />
        </>
    );
    const populatedPacket = ( // list of coupons -- according to query params
        <>
            {searchParams.get('show') === "coupons" && packet?.cards.map(c => <LanguCoupon key={c.term+new Date().getTime()} cardId={c.cardId} term={c.term} />)}
            {searchParams.get('show') === "list" && packet?.cards.map(c => <LanguListItem key={c.term+new Date().getTime()} cardId={c.cardId} term={c.term} definition={c.definition} pos={c.pos} needsRevision={c.needsRevision} packetDir={packet.dir} />)}
        </>
    );
    const packetPage = (
        <>
            {packet?.cards.length === 0 ? emptyPacket : populatedPacket}
            {ReactDOM.createPortal(<AddNew handler={handleGoToAddNewCard} />, portalElement) }
        </>
    );
    return (
        <div className={`${classes.packet} ${packet?.cards.length === 0 ? classes.emptyPacket : classes.populatedPacket}`}>
            {packetPage}
        </div>
    )
};

export default Packet;