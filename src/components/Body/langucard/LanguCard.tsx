import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import portalElement from '../../../elements/portalElement';
import { PencilVector, XVector } from "../../../generatedIcons";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useCard } from "../../../hooks/useCard";
import Memorization from "../card-menu/Memorization";
import { circleStyle, partsOfSpeech } from "../card-menu/PartOfSpeechModal";
import Clicker from './Clicker';
import classes from './LanguCard.module.css';

const LanguCard = () => {
    const { t } = useTranslation();
    const writingDir = useAppSelector(state => state.packet.writingDir);
    const navigate = useNavigate();
    const location = useLocation();
    const prevPath = location.pathname.match(/\/[a-zA-Z]*\/[a-zA-Z\d%]*/)![0];
    const params = useParams();
    const {
        card, cardId, prevCardId, nextCardId, currentMemorization, handleChangeMemorization, updateMemorizationPromise, searchByTag, error
    } = useCard();

    if (card) {
        const { term, definition, pos, example, needsRevision, tags, related, dialect, memorization } = card;

        const handleQuit = () => {
            if (currentMemorization && currentMemorization !== memorization) {
                updateMemorizationPromise(card)
                    .then((res) => {
                        console.log(`Card updated successfully!`);
                        navigate({
                            pathname: prevPath,
                            search: `${createSearchParams({ show: 'list' })}`
                        });
                    });
            } else {
                navigate({
                    pathname: prevPath,
                    search: `${createSearchParams({ show: 'list' })}`
                });
            }
        };

        return (
            <div dir={t('globalDir')} className={classes.languCardWrapper} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleQuit} className={classes.xIcon}><XVector /></div>
                <div onClick={() => navigate(`/${params.language}/card/edit?cardid=${cardId}`)} className={classes.editIcon}><PencilVector /></div>
                <section dir={writingDir}>
                    <h1 className={classes.allowTextSelection}>{term}</h1>
                    {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
                </section>
                {definition && <p style={{ textAlign: t('globalDir') === "ltr" ? "left" : "right" }} className={classes.allowTextSelection}>{definition}</p>}
                {example && <div className={classes.exampleUsage+" "+classes.allowTextSelection} dir={writingDir} style={{ textAlign: writingDir === "ltr" ? "left" : "right" }}>{example}</div>}
                {tags.length > 0 && (
                    <>
                        <h2>{t('tags')}</h2>
                        <div style={{ display: "flex", marginBottom: "0.7rem" }}>
                            {tags.map(t => <div className={classes.tag} key={t} onClick={() => searchByTag(t)}>{t}</div>)}
                        </div>
                    </>
                )}
                {related && (
                    <>
                        <h2>{t('related_words')}</h2>
                        <div style={{ textAlign: writingDir === "ltr" ? "left" : "right" }} className={classes.allowTextSelection}>
                            <h3>{related}</h3>
                        </div>
                    </>
                )}
                {dialect && (
                    <>
                        <h2>{t('dialect')}</h2>
                        <h3 className={classes.allowTextSelection}>{dialect}</h3>
                    </>
                )}
                <div style={{ alignSelf: "center" }}>
                    <Memorization chosenLevel={currentMemorization ?? memorization} handleSetMemorization={handleChangeMemorization} />
                </div>
                {ReactDOM.createPortal(<Clicker prevCardId={prevCardId} nextCardId={nextCardId} />, portalElement)}
            </div>
        )
    } else {
        return <p>{error}</p>;
    }
}

export default LanguCard;