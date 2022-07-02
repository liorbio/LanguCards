import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PencilVector, XVector } from "../../../generatedIcons";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { packetsActions } from "../../../store/redux-logic";
import Memorization from "./AddCard/Memorization";
import { circleStyle, partsOfSpeech } from "./AddCard/PartOfSpeechModal";
import classes from './LanguCard.module.css';

const LanguCard = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const selectedCardInfo = useAppSelector(state => {
        const relevantPacket = state.packets.find(p => p.language === params.language);
        if (relevantPacket) {
            const relevantCard = relevantPacket.cards.find(c => c.cardId === searchParams.get('cardid'));
            if (relevantCard) return { packetDir: relevantPacket.dir, ...relevantCard };
        }
        return;
    });
    // CHANGE THIS to grab globalDir from Redux:
    const globalDir = "ltr";

    const [currentMemorization, setCurrentMemorization] = useState<number | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (selectedCardInfo) {
        const { cardId, term, definition, pos, usage, needsRevision, tags, related, dialect, memorization, packetDir } = selectedCardInfo;
        const handleChangeMemorization = (level: number) => {
            setCurrentMemorization(level);
        };
        const handleQuit = () => {
            if (currentMemorization && currentMemorization !== memorization) {
                // call Mongo and update card

                // and/or also change Redux state 
                dispatch(packetsActions.updateMemorization({ packetLanguage: params.language!, cardId: cardId, newMemorization: currentMemorization }));
                // and navigate out:
                
            }
            navigate(-1);
        }
        return (
            <div className={classes.languCardWrapper} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleQuit} className={classes.xIcon}><XVector /></div>
                <div onClick={() => navigate(`/${params.language}/card/edit?cardid=${searchParams.get('cardid')}`)} className={classes.editIcon}><PencilVector /></div>
                <section dir={packetDir}>
                    <h1>{term}</h1>
                    {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
                </section>
                {definition && <p style={{ textAlign: globalDir === "ltr" ? "left" : "right" }}>{definition}</p>}
                {usage && <div className={classes.usage} dir={packetDir} style={{ textAlign: packetDir === "ltr" ? "left" : "right" }}>{usage}</div>}
                {tags.length > 0 && (
                    <>
                        <h2>Tags</h2>
                        <div style={{ display: "flex", marginBottom: "0.7rem" }}>
                            {tags.map(t => <div className={classes.tag} key={t}>{t}</div>)}
                        </div>
                    </>
                )}
                {related && (
                    <>
                        <h2>Related words</h2>
                        <div style={{ textAlign: packetDir === "ltr" ? "left" : "right" }}>
                            <h3>{related}</h3>
                        </div>
                    </>
                )}
                {dialect && (
                    <>
                        <h2>Dialect</h2>
                        <h3>{dialect}</h3>
                    </>
                )}
                <div style={{ alignSelf: "center" }}>
                    <Memorization chosenLevel={currentMemorization ?? memorization} handleSetMemorization={handleChangeMemorization} />
                </div>
            </div>
        )
    } else {
        return <></>;
    }
}

export default LanguCard;