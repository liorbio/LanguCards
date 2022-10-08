import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { PencilVector, XVector } from "../../../generatedIcons";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useCard } from "../../../hooks/useCard";
import Memorization from "../card-menu/Memorization";
import { circleStyle, partsOfSpeech } from "../card-menu/PartOfSpeechModal";
import classes from './LanguCard.module.css';

const LanguCard = () => {
    const { t } = useTranslation();
    const packetDir = useAppSelector(state => state.packet.packetDir);
    const navigate = useNavigate();
    const params = useParams();
    const {
        card, cardId, currentMemorization, handleChangeMemorization, updateMemorizationPromise, error
    } = useCard();

    if (card) {
        const { term, definition, pos, example, needsRevision, tags, related, dialect, memorization } = card;

        const handleQuit = () => {
            if (currentMemorization && currentMemorization !== memorization) {
                updateMemorizationPromise(card)
                    .then((res) => {
                        console.log(`Card updated successfully!`);
                        navigate(-1);
                    });
            } else {
                navigate(-1);
            }
        };

        return (
            <div dir={t('globalDir')} className={classes.languCardWrapper} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleQuit} className={classes.xIcon}><XVector /></div>
                <div onClick={() => navigate(`/${params.language}/card/edit?cardid=${cardId}`)} className={classes.editIcon}><PencilVector /></div>
                <section dir={packetDir}>
                    <h1>{term}</h1>
                    {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
                </section>
                {definition && <p style={{ textAlign: t('globalDir') === "ltr" ? "left" : "right" }}>{definition}</p>}
                {example && <div className={classes.exampleUsage} dir={packetDir} style={{ textAlign: packetDir === "ltr" ? "left" : "right" }}>{example}</div>}
                {tags.length > 0 && (
                    <>
                        <h2>{t('tags')}</h2>
                        <div style={{ display: "flex", marginBottom: "0.7rem" }}>
                            {tags.map(t => <div className={classes.tag} key={t}>{t}</div>)}
                        </div>
                    </>
                )}
                {related && (
                    <>
                        <h2>{t('related_words')}</h2>
                        <div style={{ textAlign: packetDir === "ltr" ? "left" : "right" }}>
                            <h3>{related}</h3>
                        </div>
                    </>
                )}
                {dialect && (
                    <>
                        <h2>{t('dialect')}</h2>
                        <h3>{dialect}</h3>
                    </>
                )}
                <div style={{ alignSelf: "center" }}>
                    <Memorization chosenLevel={currentMemorization ?? memorization} handleSetMemorization={handleChangeMemorization} />
                </div>
            </div>
        )
    } else {
        return <p>{error}</p>;
    }
}

export default LanguCard;