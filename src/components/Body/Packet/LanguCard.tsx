import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PencilVector, XVector } from "../../../generatedIcons";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { CardType } from "../../../types/types";
import Memorization from "../card-menu/Memorization";
import { circleStyle, partsOfSpeech } from "../card-menu/PartOfSpeechModal";
import classes from './LanguCard.module.css';

const LanguCard = () => {
    const { t } = useTranslation();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const packetDir = useAppSelector(state => state.packet.packetDir);
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [card, setCard] = useState<CardType | null>(null);
    const [currentMemorization, setCurrentMemorization] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/packets/${packetId}/${searchParams.get('cardid')}`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setCard(res);
                setCurrentMemorization(res.memorization);
            })
            .catch((err) => console.log(`Error fetching card: ${err}`));
    }, [packetId, searchParams, authToken]);

    const navigate = useNavigate();

    if (card) {
        const { term, definition, pos, usage, needsRevision, tags, related, dialect, memorization } = card;
        const handleChangeMemorization = (level: number) => {
            setCurrentMemorization(level);
        };
        const handleQuit = () => {
            if (currentMemorization && currentMemorization !== memorization) {
                fetch(`/packets/${packetId}/${searchParams.get('cardid')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'auth-token': authToken
                    },
                    body: JSON.stringify({ term, definition, pos, usage, needsRevision, tags, related, dialect, currentMemorization })
                })
                    .then((res) => {
                        console.log(`Card updated successfully!`);
                        navigate(-1);
                    })
                    .catch((res) => console.log(`Card update unsuccessful`));
            } else {
                navigate(-1);
            }
            
        }
        return (
            <div dir={t('globalDir')} className={classes.languCardWrapper} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
                <div onClick={handleQuit} className={classes.xIcon}><XVector /></div>
                <div onClick={() => navigate(`/${params.language}/card/edit?cardid=${searchParams.get('cardid')}`)} className={classes.editIcon}><PencilVector /></div>
                <section dir={packetDir}>
                    <h1>{term}</h1>
                    {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
                </section>
                {definition && <p style={{ textAlign: t('globalDir') === "ltr" ? "left" : "right" }}>{definition}</p>}
                {usage && <div className={classes.usage} dir={packetDir} style={{ textAlign: packetDir === "ltr" ? "left" : "right" }}>{usage}</div>}
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
        return <></>;
    }
}

export default LanguCard;