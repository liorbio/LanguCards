import ReactDOM from 'react-dom';
import AddNew from '../AddNew';
import ClickBelow from '../../../icons/ClickBelow.png';
import classes from './Packet.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LanguCoupon from './LanguCoupon';
import LanguListItem from './LanguListItem';

// To do:
// (***) Find a way to eliminate red squiggly lines.
// (***) Commit and push to Github.
// (**) show cards in coupon form.
// (**) show cards in list form.
// (*) delete packets dummy and work with DB.

const portalElementAsArray = document.querySelectorAll<HTMLElement>("#overlay-root");
const portalElement = portalElementAsArray[0];

// 🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍
//
//         Coupon/List formes -- determined by Query Params!!!
//
// 🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍🤩😍

const Packet = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const lang = params.language;
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
            {searchParams.get('show') === "coupons" && packet?.cards.map(c => <LanguCoupon key={c.term+new Date().getTime()} term={c.term} />)}
            {searchParams.get('show') === "list" && packet?.cards.map(c => <LanguListItem key={c.term+new Date().getTime()} term={c.term} definition={c.definition} pos={c.pos} needsRevision={c.needsRevision} dir={packet.dir} />)}
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