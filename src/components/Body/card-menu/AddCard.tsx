import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import portalElement from '../../../elements/portalElement';
import CircledPlus from '../../../generatedIcons/CircledPlus.js';
import classes from './AddCard.module.css';
import Memorization from './Memorization';
import PartOfSpeechModal, { circleStyle, partsOfSpeech } from './PartOfSpeechModal';
import { CheckVector } from '../../../generatedIcons';
import TagsModal from './TagsModal';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import DeleteCardButton from './DeleteCardButton';
import Tutorial from './Tutorial/Tutorial';
import GoBack from '../../header/GoBack';
import DefaultModal from '../../UI/DefaultModal';
import { useCardMenu } from '../../../hooks/useCardMenu';

const AddCard = ({ editMode = false }: { editMode?: boolean }) => {
    const {
        showPOSModal, setShowPOSModal,
        chosenPOS, handleChoosePOS,
        textStates, setTextStates,
        needsRevision, toggleNeedsRevision,
        tags, setTags,
        memorization, handleSetMemorization,
        executeSave
    } = useCardMenu(editMode);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const packetDir = useAppSelector(state => state.packet.packetDir);

    // States:
    const showTutorial = !useAppSelector(state => state.settings.seenTutorial);
    const [changeDetected, setChangeDetected] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [tagsModalShown, setTagsModalShown] = useState(false);
    
    // Handlers:
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextStates(prev => { 
            const newObj = {...prev};
            newObj[event.target.id as keyof typeof textStates] = event.target.value;
            return newObj;
        });
        setChangeDetected(true);
    }
    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
        }
    };
    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };

    const handleExit = () => {
        navigate(-1);
    }
    const handleXClick = () => {
        if (changeDetected) {
            setShowWarning(true);
        } else {
            handleExit();
        }
    };

    return (
        <>
            {showTutorial && ReactDOM.createPortal(<Tutorial packetDir={packetDir} />, portalElement)}
            {showWarning && <DefaultModal title={t('warning')} buttonOne={t('cancel')} buttonTwo={t('exit')} handler={handleExit} toggler={() => setShowWarning(false)} modalType="Warning">
                <div style={{ paddingBlock: "1.5rem", textAlign: "center" }}>{t('are_you_sure_exit_without_save')}</div>
            </DefaultModal>}
            <div className={classes.addCardWrapper} dir={t('globalDir')} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleXClick} style={{ position: "fixed", zIndex: 4, width: "12vw", height: "60px", top: "0", left: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><GoBack icon="x" goTo="NONE" /></div>
                <div onClick={executeSave} style={{ position: "fixed", zIndex: 4, width: "12vw", height: "60px", top: "0", right: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckVector /></div>
                <div dir={packetDir} style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw" }}>
                    <input id="term" value={textStates.term} onChange={handleChangeText} type="text" style={{ fontSize: "1.5rem", backgroundColor: needsRevision ? "#FAF1ED" : "#fafafa" }} className={classes.termInput} placeholder={t('term')} />
                    {chosenPOS ? <div style={{ backgroundColor: partsOfSpeech[chosenPOS].color, ...circleStyle }} onClick={() => setShowPOSModal(true)}>{chosenPOS}</div> : <CircledPlus onClick={() => setShowPOSModal(true)} />}
                    {showPOSModal && ReactDOM.createPortal(<PartOfSpeechModal handleChoose={handleChoosePOS} handleExit={() => setShowPOSModal(false)}/>, portalElement)}
                </div>
                <textarea id="definition" value={textStates.definition} onChange={handleChangeText} placeholder={t('definition')} className={classes.definition} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
                <textarea dir={packetDir} id="example" value={textStates.example} onChange={handleChangeText} placeholder={t('examples_of_usage')} className={classes.exampleUsage} />
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100vw", marginTop: "2vh" }}>
                    <div className={`${classes.button} ${classes.buttonOfSet}`} style={needsRevision ? { backgroundColor: "#ee4444", color: "white" } : {}} onClick={toggleNeedsRevision}>{t('needs_revision')}</div>
                    <div onClick={() => setTagsModalShown(true)} className={`${classes.button} ${classes.buttonOfSet} ${tags.length > 0 ? classes.hasTags : null}`}>{t('tags')}...</div>
                    {tagsModalShown && ReactDOM.createPortal(<TagsModal handleExit={() => setTagsModalShown(false)} tags={tags} addTag={addTag} removeTag={removeTag} />, portalElement)}
                </div>
                <input dir={packetDir} id="related" value={textStates.related} onChange={handleChangeText} type="text" className={classes.otherInput} placeholder={t('related_words')} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
                <input id="dialect" type="text" value={textStates.dialect} onChange={handleChangeText} className={classes.otherInput} placeholder={t('dialect')} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
                <Memorization chosenLevel={memorization} handleSetMemorization={handleSetMemorization} />
                {editMode && <DeleteCardButton />}
            </div>
        </>
    )
};

export default AddCard;