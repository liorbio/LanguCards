import { createSearchParams, useNavigate } from "react-router-dom";
import { circleStyle, partsOfSpeech } from "./AddCard/PartOfSpeechModal";

const LanguListItem = ({ cardId, term, definition, pos, needsRevision, packetDir }: { cardId: string, term: string, definition: string, pos: string, needsRevision: boolean, packetDir: "ltr" | "rtl" }) => {
    const navigate = useNavigate();
    // get from Redux!: CHANGE THIS
    const globalDir = "ltr";
    const navToCard = () => {
        navigate({
            pathname: "card",
            search: `${createSearchParams({ cardid: cardId })}`
        });
    };
    return (
        <article onClick={navToCard} style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
            <div dir={packetDir} style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
                <div style={{ alignSelf: "center", justifySelf: "start", fontSize: "1.3rem", fontWeight: "bold", paddingInline: "1rem" }}>{term}</div>
                {pos && <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>}
            </div>
            <div style={{ justifySelf: "start", paddingInline: "1rem", gridArea: 2, textAlign: globalDir === "ltr" ? "left" : "right" }}>{definition}</div>
        </article>
    );
};

export default LanguListItem;