import { createSearchParams, useNavigate } from "react-router-dom";
import { circleStyle, partsOfSpeech } from "./AddCard/PartOfSpeechModal";

const LanguListItem = ({ cardId, term, definition, pos, needsRevision, dir }: { cardId: string, term: string, definition: string, pos: string, needsRevision: boolean, dir: "ltr" | "rtl" }) => {
    const navigate = useNavigate();
    const navToCard = () => {
        navigate({
            pathname: "card",
            search: `${createSearchParams({ cardid: cardId })}`
        });
    };
    return (
        <article onClick={navToCard} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
            <div style={{ alignSelf: "center", justifySelf: "start", fontSize: "1.3rem", fontWeight: "bold", paddingLeft: "1rem" }}>{term}</div>
            <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>
            <div style={{ justifySelf: "start", paddingLeft: "1rem", gridArea: "definition", textAlign: dir === "ltr" ? "left" : "right" }}>{definition}</div>
        </article>
    );
};

export default LanguListItem;