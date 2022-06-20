import ReactDOM from 'react-dom';
import AddNew from '../AddNew';
import ClickBelow from '../../../icons/ClickBelow.png';
import classes from './Packet.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { PacketInterface } from '../LearningBox/LearningBox';
import { useEffect } from 'react';
import { CardInterface } from './Card';

// To do:
// (***) Find a way to eliminate red squiggly lines.
// (***) Commit and push to Github.
// (**) show cards in coupon form.
// (**) show cards in list form.
// (*) delete packets dummy and work with DB.

const portalElementAsArray = document.querySelectorAll<HTMLElement>("#overlay-root");
const portalElement = portalElementAsArray[0];

// DELETE THIS DUMMY, instead, check in useEffect if lang exists in DB.
const packets: PacketInterface[] = [{ language: "arabic", direction: "ltr" }, { language: "turkish", direction: "rtl" }];
// DELETE THIS DUMMY
const cards: CardInterface[] = [
    { word: "مقلعط" },
    { word: "كتمان" }
];

const Packet = () => {
    const navigate = useNavigate();
    const params = useParams();
    const lang = params.language;
    
    const handleGoToAddNewCard = () => {
        navigate('./add');
    }
    const doesLangExistInDummyArr = packets.filter(p => p.language === lang).length === 1;
    useEffect(() => {
        if (!doesLangExistInDummyArr) {
            navigate('/');
        }
    }, [doesLangExistInDummyArr, navigate]);

    const emptyPacket = doesLangExistInDummyArr && (
        <>
            <div style={{ gridRow: 1 }}>
            <h1>{lang![0].toUpperCase()+lang!.slice(1)}</h1>
            Add words to your packet!</div>
            <img style={{ marginLeft: "3rem", gridRow: 2, height: "47vh" }} src={ClickBelow} alt="click on bottom right corner" />
        </>
    );
    const packetPage = doesLangExistInDummyArr && (
        <>
            {emptyPacket}
            {ReactDOM.createPortal(<AddNew handler={handleGoToAddNewCard} />, portalElement) }
        </>
    );
    return (
        <div className={classes.packet + ' ' + classes.emptyPacket}>
            {packetPage}
        </div>
    )
};

export default Packet;