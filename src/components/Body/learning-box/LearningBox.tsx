import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import ClickBelow from '../../../icons/ClickBelow.png';
import PacketCover from './PacketCover';
import classes from "./LearningBox.module.css";
import AddNew from '../AddNew';
import ModalBackgroundClicksPrevention from '../../UI/ModalBackgroundClicksPrevention';
import NewPacketModal from './NewPacketModal';
import portalElement from '../../../elements/portalElement';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { PacketType } from '../../../types/types';
import { packetsActions } from '../../../store/redux-logic';
import LoadingSpinner from '../../UI/LoadingSpinner';

// To do:
// change stupidHandleNewPacketAddition into a handler that adds packet to DB

const LearningBox = () => {
    const { t } = useTranslation();
    const packetsInRedux = useAppSelector(state => state.packets);
    const dispatch = useAppDispatch();
    const [packets, setPackets] = useState<PacketType[] | null>(null);
    const [newPacketModalShown, setNewPacketModalShown] = useState(false);
    // useEffect that fetches packets from local storage / mongo
    useEffect(() => {
        setPackets(packetsInRedux);
    }, [packetsInRedux]);


    const handleNewPacketAddition = (packet: PacketType) => {
        // NEEDS TO BE CHANGED TO WORK WITH local storage / mongo Inside useEffect
        dispatch(packetsActions.addPacket(packet));
        setNewPacketModalShown(false);
    }
    
    const toggleNewPacketModal = () => {
        setNewPacketModalShown(prev => !prev);
    };
    
    const emptyLearningBox = (
        <>
            <p>{t('strengthen_vocab')}<br /><br />{t('create_packet')}<br />{t('to_learn')}</p>
            <img style={{ marginLeft: "3rem", height: "47vh" }} src={ClickBelow} alt="click on bottom right corner" />
        </>
    ); // change img to SVG

    const populatedLearningBox = (
        <>
            {packets?.map((p, idx) => <PacketCover language={p.language} key={idx} /> )}
        </>
    );
    return (
        <>
        <div className={classes.newLearningBoxVersion}>

        </div>
            {/* packets === null ? <LoadingSpinner /> :
                <div dir={t('globalDir')} className={classes.learningBox + ' ' + (packets.length === 0 ? classes.emptyLearningBox : classes.populatedLearningBox)}>
                    {packets.length === 0 ? emptyLearningBox : populatedLearningBox}
                    { ReactDOM.createPortal(<AddNew handler={toggleNewPacketModal} />, portalElement) }
                    { newPacketModalShown && ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={toggleNewPacketModal} />, portalElement) }
                    { newPacketModalShown && ReactDOM.createPortal(<NewPacketModal toggler={toggleNewPacketModal} handler={handleNewPacketAddition} />, portalElement) }
                </div>
    */}
        </>
    );
};

export default LearningBox;