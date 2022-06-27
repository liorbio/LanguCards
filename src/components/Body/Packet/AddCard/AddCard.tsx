import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import portalElement from '../../../../elements/portalElement';
import CircledPlus from '../../../../generatedIcons/CircledPlus.js';
import classes from './AddCard.module.css';
import Memorization from './Memorization';
import PartOfSpeechModal, { circleStyle, partsOfSpeech } from './PartOfSpeechModal';
import { CheckVector } from '../../../../generatedIcons';
import TagsModal from './TagsModal';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { packetsActions } from '../../../../store/redux-logic';
import { CardType } from '../../../../types/types';

const AddCard = ({ iTerm = "", iDefinition = "", iPos = "", iUsage = "", iNeedsRevision = false, iTags = [], iRelated = "", iDialect = "", iMemorization = 0 }: { iTerm?: string, iDefinition?: string, iPos?: string, iUsage?: string, iNeedsRevision?: boolean, iTags?: string[], iRelated?: string, iDialect?: string, iMemorization?: number }) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    // Refs: 
    const termRef = useRef<HTMLInputElement>(null);
    const definitionRef = useRef<HTMLTextAreaElement>(null);
    const usageRef = useRef<HTMLTextAreaElement>(null);
    const relatedRef = useRef<HTMLInputElement>(null);
    const dialectRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        termRef.current!.value = iTerm;
        definitionRef.current!.value = iDefinition;
        usageRef.current!.value = iUsage;
        relatedRef.current!.value = iRelated;
        dialectRef.current!.value = iDialect;
    }, [iTerm, iDefinition, iUsage, iRelated, iDialect]);
    // States: 
    const [showPartOfSpeechModal, setShowPartOfSpeechModal] = useState(false);
    const [chosenPOS, setChosenPOS] = useState(iPos);
    const handleChoose = (pos: string) => {
        if (chosenPOS === pos) {
            setChosenPOS("");
        } else {
            setChosenPOS(pos);
        }
        setShowPartOfSpeechModal(false);
    };
    const [needsRevision, setNeedsRevision] = useState(iNeedsRevision);
    const toggleNeedsRevision = () => {
        setNeedsRevision(prev => !prev);
    };
    const [tagsModalShown, setTagsModalShown] = useState(false);
    const [tags, setTags] = useState<string[]>(iTags);
    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
        }
    };
    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };
    const [memorization, setMemorization] = useState(iMemorization);
    const handleSetMemorization = (level: number) => {
        setMemorization(level);
    }
    const handleAdd = () => {
        if (termRef.current!.value.length > 0) {
            const cardToAdd: CardType = { term: termRef.current!.value, definition: definitionRef.current!.value, pos: chosenPOS, usage: usageRef.current!.value, needsRevision: needsRevision, tags: tags, related: relatedRef.current!.value, dialect: dialectRef.current!.value, memorization: memorization }; 
            dispatch(packetsActions.addCardToPacket({ packetLanguage: params.language!, card: cardToAdd }));
            navigate(-1);
        }
    };
    return (
        <div className={classes.addCardWrapper} dir="ltr" style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
            <div onClick={handleAdd} style={{ position: "fixed", zIndex: 6, width: "12vw", height: "50px", top: "5vh", right: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><CheckVector /></div>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw" }}>
                <input ref={termRef} type="text" style={{ width: "80vw", fontSize: "1.5rem", backgroundColor: needsRevision ? "#FAF1ED" : "#fafafa" }} className={classes.requiredInput} placeholder="Term..." />
                {chosenPOS ? <div style={{ backgroundColor: partsOfSpeech[chosenPOS].color, ...circleStyle }} onClick={() => setShowPartOfSpeechModal(true)}>{chosenPOS}</div> : <CircledPlus onClick={() => setShowPartOfSpeechModal(true)} />}
                {showPartOfSpeechModal && ReactDOM.createPortal(<PartOfSpeechModal handleChoose={handleChoose} handleExit={() => setShowPartOfSpeechModal(false)}/>, portalElement)}
            </div>
            <textarea ref={definitionRef} placeholder="Definition..." className={classes.definition} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
            <textarea ref={usageRef} placeholder="Examples of usage..." className={classes.exampleUsage} />
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100vw", marginTop: "2vh" }}>
                <div className={`${classes.button} ${classes.buttonOfSet}`} style={needsRevision ? { backgroundColor: "#ee4444", color: "white" } : {}} onClick={toggleNeedsRevision}>Needs revision</div>
                <div onClick={() => setTagsModalShown(true)} className={`${classes.button} ${classes.buttonOfSet}`}>Tags...</div>
                {tagsModalShown && ReactDOM.createPortal(<TagsModal handleExit={() => setTagsModalShown(false)} tags={tags} addTag={addTag} removeTag={removeTag} />, portalElement)}
            </div>
            <input ref={relatedRef} type="text" className={classes.otherInput} placeholder="Related words..." style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
            <input ref={dialectRef} type="text" className={classes.otherInput} placeholder="Dialect..." style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}} />
            <Memorization chosenLevel={memorization} handleSetMemorization={handleSetMemorization} />
        </div>
    )
};

export default AddCard;