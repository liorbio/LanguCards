import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ClickBelow from '../../../icons/ClickBelow.png';
import PacketCover from './PacketCover';
import classes from "./LearningBox.module.css";
import AddNew from '../AddNew';
import ModalBackgroundClicksPrevention from '../../../UI/ModalBackgroundClicksPrevention';
import NewPacketModal from './NewPacketModal';
import portalElement from '../../../elements/portalElement';

// To do:
// change stupidHandleNewPacketAddition into a handler that adds packet to DB

// interface that will be moved in the future to "types" folder
export interface PacketInterface {
    language: string;
    direction: "ltr" | "rtl";
};

const LearningBox = () => {
    const [packets, setPackets] = useState<PacketInterface[]>([]);
    const [newPacketModalShown, setNewPacketModalShown] = useState(false);
    // useEffect that fetches packets from local storage / mongo
    const stupidHandleNewPacketAddition = (packet: PacketInterface) => {
        // NEEDS TO BE CHANGED TO WORK WITH local storage / mongo Inside useEffect
        setPackets(prev => [...prev, packet]);
        setNewPacketModalShown(false);
    }
    
    const toggleNewPacketModal = () => {
        setNewPacketModalShown(prev => !prev);
    };
    
    const emptyLearningBox = (
        <>
            <p>Strengthen your vocab!<br /><br />Create a new card packet<br />to learn a new language</p>
            <img style={{ marginLeft: "3rem", height: "47vh" }} src={ClickBelow} alt="click on bottom right corner" />
        </>
    );

    const populatedLearningBox = (
        <>
            {packets?.map((p, idx) => <PacketCover language={p.language} direction={p.direction} key={idx} /> )}
        </>
    );
    return (
        <div className={classes.learningBox + ' ' + (packets.length === 0 ? classes.emptyLearningBox : classes.populatedLearningBox)}>
            {packets.length === 0 ? emptyLearningBox : populatedLearningBox}
            { ReactDOM.createPortal(<AddNew handler={toggleNewPacketModal} />, portalElement) }
            { newPacketModalShown && ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={toggleNewPacketModal} />, portalElement) }
            { newPacketModalShown && ReactDOM.createPortal(<NewPacketModal toggler={toggleNewPacketModal} handler={stupidHandleNewPacketAddition} />, portalElement) }
        </div>
    );
};

export default LearningBox;