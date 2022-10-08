import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import PacketCover from './PacketCover';
import classes from "./LearningBox.module.css";
import AddNew from '../../UI/AddNew';
import NewPacketModal from './NewPacketModal';
import portalElement from '../../../elements/portalElement';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { PacketType } from '../../../types/types';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { ClickBelow } from '../../../generatedIcons';
import { usePackets } from '../../../hooks/usePackets';
import { addPacketPromise } from '../../../proxies/packetCrudProxy';

const LearningBox = () => {
    const { t } = useTranslation();
    const { packets, performForcedReload, error } = usePackets();
    const authToken = useAppSelector(state => state.auth.jwt);
    const [newPacketModalShown, setNewPacketModalShown] = useState(false);

    const toggleNewPacketModal = () => {
        setNewPacketModalShown(prev => !prev);
    };

    const handleNewPacketAddition = (packet: PacketType) => {
        addPacketPromise(authToken, packet)
            .then((res) => {
                console.log(`Successfully added new packet of ${packet.language}`);
                setNewPacketModalShown(false);
                performForcedReload();
            })
            .catch((err) => console.log(`Error adding a ${packet.language} packet: ${err}`));
    }
    
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
            {error && <p>{error}</p>}
        </>
    );
};

export default LearningBox;