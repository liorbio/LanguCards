import { createSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { circleStyle, partsOfSpeech } from "../card-menu/PartOfSpeechModal";

const LanguListItem = ({ cardId, term, definition, pos, needsRevision, writingDir }: { cardId: string, term: string, definition: string, pos: string, needsRevision: boolean, writingDir: "ltr" | "rtl" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const navToCard = () => {
        navigate({
            pathname: "card",
            search: `${createSearchParams({ cardid: cardId })}`
        });
    };

    return (
        <article onClick={navToCard} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
            <div dir={writingDir} style={{ display: "grid", gridTemplateColumns: "1fr 4rem" }}>
                <div style={{ alignSelf: "center", justifySelf: "start", fontSize: "1.3rem", fontWeight: "bold", paddingInline: "1rem" }}>{term}</div>
                {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
            </div>
            <div dir={t('globalDir')} style={{ paddingInline: "1rem", gridArea: 2, textAlign: t('globalDir') === "ltr" ? "left" : "right" }}>{definition}</div>
        </article>
    );
};

export default LanguListItem;