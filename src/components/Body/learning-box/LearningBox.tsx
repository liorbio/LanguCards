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
import { useNavigate } from 'react-router-dom';

const LearningBox = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { packets, performForcedReload, error, updatePacketDetailsFetch } = usePackets();
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
    };
    
    const emptyLearningBox = (
        <>
            <p>{t('strengthen_vocab')}<br /><br />{t('create_packet')}<br />{t('to_learn')}</p>
            <ClickBelow />
        </>
    );
    const populatedLearningBox = (
        <>
            {packets?.map((p, idx) => <PacketCover handleUpdatePacketDetails={({ language, writingDir }: { language?: string, writingDir?: "ltr" | "rtl" }) => updatePacketDetailsFetch(p._id!, { language, writingDir })} className={classes.packetCover} language={p.language} key={idx} packetId={p._id!} writingDir={p.writingDir} /> )}
        </>
    );
    return (
        <>
            {packets === null ? <LoadingSpinner /> :
                !error && <div dir={t('globalDir')} className={classes.learningBox + ' ' + (packets.length === 0 ? classes.emptyLearningBox : classes.populatedLearningBox)}>
                    {packets.length === 0 ? emptyLearningBox : populatedLearningBox}
                    {ReactDOM.createPortal(<AddNew handler={toggleNewPacketModal} />, portalElement)}
                    {newPacketModalShown && <NewPacketModal toggler={toggleNewPacketModal} handler={handleNewPacketAddition} />}
                </div>
            }
            {error && <>
                <p>{error}</p>
                <button onClick={() => navigate(0)}>Tap to reload</button>
            </>}
        </>
    );
};

export default LearningBox;