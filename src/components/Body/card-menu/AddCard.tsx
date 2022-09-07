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
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { packetsActions } from '../../../store/redux-logic';
import { CardType } from '../../../types/types';
import uniqid from 'uniqid';
import DeleteCardButton from './DeleteCardButton';
import Tutorial from './Tutorial/Tutorial';
import GoBack from '../../header/GoBack';
import DefaultModal from '../../UI/DefaultModal';

const AddCard = ({ editMode = false }: { editMode?: boolean }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const packetDir = useAppSelector(state => state.packets.find(p => p.language === params.language)!.dir);
    const cardInfo = useAppSelector(state => state.packets.find(p => p.language === params.language)!.cards.find(c => c.cardId === searchParams.get('cardid')));

    // States: 
    const showTutorial = !useAppSelector(state => state.settings.seenTutorial);
    const [changeDetected, setChangeDetected] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showPartOfSpeechModal, setShowPartOfSpeechModal] = useState(false);
    const [chosenPOS, setChosenPOS] = useState(cardInfo?.pos ?? "");
    const [textStates, setTextStates] = useState({
        term: cardInfo?.term ?? "",
        definition: cardInfo?.definition ?? "",
        usage: cardInfo?.usage ?? "",
        related: cardInfo?.related ?? "",
        dialect: cardInfo?.dialect ?? ""
    });
    const [needsRevision, setNeedsRevision] = useState(cardInfo?.needsRevision ?? false);    
    const [tagsModalShown, setTagsModalShown] = useState(false);
    const [tags, setTags] = useState<string[]>(cardInfo?.tags ?? []);
    const [memorization, setMemorization] = useState(cardInfo?.memorization ?? 0);
    
    // Handlers:
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextStates(prev => { 
            const newObj = {...prev};
            newObj[event.target.id as keyof typeof textStates] = event.target.value;
            return newObj });
        const initialValue = cardInfo ? cardInfo[event.target.id as keyof typeof cardInfo] : "";
        if (event.target.value !== initialValue) {
            setChangeDetected(true);
        } else {
            setChangeDetected(false);
        }
    }
    const handleChoose = (pos: string) => {
        if (chosenPOS === pos) {
            setChosenPOS("");
        } else {
            setChosenPOS(pos);
        }
        setShowPartOfSpeechModal(false);
    };
    const toggleNeedsRevision = () => {
        setNeedsRevision(prev => !prev);
    };
    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
        }
    };
    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };
    const handleSetMemorization = (level: number) => {
        setMemorization(level);
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

    const handleAdd = () => {
        if (textStates.term.length > 0) {
            if (!editMode) { // new card
                const cardToAdd: CardType = { cardId: uniqid(), term: textStates.term, definition: textStates.definition, pos: chosenPOS, usage: textStates.usage, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                dispatch(packetsActions.addCardToPacket({ packetLanguage: params.language!, card: cardToAdd }));
                navigate(-1);
            } else { // editing an existing card
                const cardUpdatedInfo: CardType = { cardId: cardInfo!.cardId, term: textStates.term, definition: textStates.definition, pos: chosenPOS, usage: textStates.usage, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                dispatch(packetsActions.updateCard({ packetLanguage: params.language!, newCardInfo: cardUpdatedInfo }));
                navigate(-1);
            }
        }
    };


    return (
        <>
            {showTutorial && ReactDOM.createPortal(<Tutorial packetDir={packetDir} />, portalElement)}
            {showWarning && ReactDOM.createPortal(<DefaultModal title={t('warning')} buttonOne={t('cancel')} buttonTwo={t('exit')} handler={handleExit} toggler={() => setShowWarning(false)} modalType="Warning">
                <div style={{ paddingBlock: "1.5rem", textAlign: "center" }}>{t('are_you_sure_exit_without_save')}</div>
            </DefaultModal>, portalElement)}
            <div className={classes.addCardWrapper} dir={t('globalDir')} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleXClick} style={{ position: "fixed", zIndex: 4, width: "12vw", height: "60px", top: "0", left: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><GoBack icon="x" goTo="NONE" /></div>
                <div onClick={handleAdd} style={{ position: "fixed", zIndex: 4, width: "12vw", height: "60px", top: "0", right: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckVector /></div>
                <div dir={packetDir} style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw" }}>
                    <input id="term" value={textStates.term} onChange={handleChangeText} type="text" style={{ fontSize: "1.5rem", backgroundColor: needsRevision ? "#FAF1ED" : "#fafafa" }} className={classes.termInput} placeholder={t('term')} />
                    {chosenPOS ? <div style={{ backgroundColor: partsOfSpeech[chosenPOS].color, ...circleStyle }} onClick={() => setShowPartOfSpeechModal(true)}>{chosenPOS}</div> : <CircledPlus onClick={() => setShowPartOfSpeechModal(true)} />}
                    {showPartOfSpeechModal && ReactDOM.createPortal(<PartOfSpeechModal handleChoose={handleChoose} handleExit={() => setShowPartOfSpeechModal(false)}/>, portalElement)}
                </div>
                <textarea id="definition" value={textStates.definition} onChange={handleChangeText} placeholder={t('definition')} className={classes.definition} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
                <textarea dir={packetDir} id="usage" value={textStates.usage} onChange={handleChangeText} placeholder={t('examples_of_usage')} className={classes.exampleUsage} />
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