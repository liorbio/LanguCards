import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import PacketCover from './PacketCover';
import classes from "./LearningBox.module.css";
import AddNew from '../../UI/AddNew';
import NewPacketModal from './NewPacketModal';
import portalElement from '../../../elements/portalElement';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { PacketType } from '../../../types/types';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { ClickBelow } from '../../../generatedIcons';
import { packetActions, searchActions } from '../../../store/redux-logic';

const LearningBox = () => {
    const { t } = useTranslation();
    const authToken = useAppSelector(state => state.auth.jwt);
    const dispatch = useAppDispatch();
    const [packets, setPackets] = useState<PacketType[] | null>(null);
    const [newPacketModalShown, setNewPacketModalShown] = useState(false);
    const [forcedReload, setForcedReload] = useState(false);
    
    useEffect(() => {
        // Clear cards of last viewed packet
        dispatch(packetActions.clearCards());
        dispatch(searchActions.clearSearch());
        // fetch packets
        fetch(`/packets`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => setPackets(res))
            .catch((err) => console.log(`Error fetching packets: ${err}`));
    }, [authToken, forcedReload, dispatch]);


    const handleNewPacketAddition = (packet: PacketType) => {
        fetch(`/packets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ language: packet.language, writingDir: packet.dir })
        })
            .then((res) => {
                console.log(`Successfully added new packet of ${packet.language}`);
                setNewPacketModalShown(false);
                setForcedReload(prev => !prev);
            })
            .catch((err) => console.log(`Error adding a ${packet.language} packet: ${err}`));
    }
    
    const toggleNewPacketModal = () => {
        setNewPacketModalShown(prev => !prev);
    };
    
    const emptyLearningBox = (
        <>
            <p>{t('strengthen_vocab')}<br /><br />{t('create_packet')}<br />{t('to_learn')}</p>
            <ClickBelow />
        </>
    );
    const populatedLearningBox = (
        <>
            {packets?.map((p, idx) => <PacketCover language={p.language} key={idx} packetId={p._id!} packetDir={p.dir} /> )}
        </>
    );
    return (
        <>
            {packets === null ? <LoadingSpinner /> :
                <div dir={t('globalDir')} className={classes.learningBox + ' ' + (packets.length === 0 ? classes.emptyLearningBox : classes.populatedLearningBox)}>
                    {packets.length === 0 ? emptyLearningBox : populatedLearningBox}
                    {ReactDOM.createPortal(<AddNew handler={toggleNewPacketModal} />, portalElement)}
                    {newPacketModalShown && <NewPacketModal toggler={toggleNewPacketModal} handler={handleNewPacketAddition} />}
                </div>
            }
        </>
    );
};

export default LearningBox;