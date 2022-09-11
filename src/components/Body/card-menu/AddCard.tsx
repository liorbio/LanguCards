import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import portalElement from '../../../elements/portalElement';
import CircledPlus from '../../../generatedIcons/CircledPlus.js';
import classes from './AddCard.module.css';
import Memorization from './Memorization';
import PartOfSpeechModal, { circleStyle, partsOfSpeech } from './PartOfSpeechModal';
import { CheckVector } from '../../../generatedIcons';
import TagsModal from './TagsModal';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CardType } from '../../../types/types';
import DeleteCardButton from './DeleteCardButton';
import Tutorial from './Tutorial/Tutorial';
import GoBack from '../../header/GoBack';
import DefaultModal from '../../UI/DefaultModal';

const AddCard = ({ editMode = false }: { editMode?: boolean }) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const packetDir = useAppSelector(state => state.packet.packetDir);

    // States: 
    const showTutorial = !useAppSelector(state => state.settings.seenTutorial);
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [changeDetected, setChangeDetected] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showPartOfSpeechModal, setShowPartOfSpeechModal] = useState(false);
    const [chosenPOS, setChosenPOS] = useState("");
    const [textStates, setTextStates] = useState({
        term: "",
        definition: "",
        usage: "",
        related: "",
        dialect: ""
    });
    const [needsRevision, setNeedsRevision] = useState(false);    
    const [tagsModalShown, setTagsModalShown] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [memorization, setMemorization] = useState(0);

    // Load state values from Mongo if in edit mode:
    useEffect(() => {
        if (editMode) {
            fetch(`packets/${packetId}/${searchParams.get('cardid')}`, {
                headers: {
                    'auth-token': authToken
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setChosenPOS(res.pos);
                    setTextStates({
                        term: res.term,
                        definition: res.definition,
                        usage: res.usage,
                        related: res.related,
                        dialect: res.dialect,
                    })
                    setNeedsRevision(res.needsRevision);
                    setTags(res.tags);
                    setMemorization(res.memorization);
                })
                .catch((err) => console.log(`Error fetching card: ${err}`));
        }
    }, [authToken, editMode, packetId, searchParams]);
    
    // Handlers:
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextStates(prev => { 
            const newObj = {...prev};
            newObj[event.target.id as keyof typeof textStates] = event.target.value;
            return newObj;
        });
        setChangeDetected(true);
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
                const cardToAdd: CardType = { term: textStates.term, definition: textStates.definition, pos: chosenPOS, usage: textStates.usage, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                fetch(`packets/${packetId}/${searchParams.get('cardid')}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'auth-token': authToken
                    },
                    body: JSON.stringify(cardToAdd)
                })
                    .then((res) => {
                        console.log(`Added card successfully`);
                        navigate(-1);
                    })
                    .catch((err) => console.log(`Error adding card: ${err}`));
            } else { // editing an existing card
                const cardUpdatedInfo: CardType = { term: textStates.term, definition: textStates.definition, pos: chosenPOS, usage: textStates.usage, needsRevision: needsRevision, tags: tags, related: textStates.related, dialect: textStates.dialect, memorization: memorization }; 
                fetch(`packets/${packetId}/${searchParams.get('cardid')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'auth-token': authToken
                    },
                    body: JSON.stringify(cardUpdatedInfo)
                })
                    .then((res) => {
                        console.log(`Added card successfully`)
                        navigate(-1);
                    })
                    .catch((err) => console.log(`Error adding card: ${err}`));
            }
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