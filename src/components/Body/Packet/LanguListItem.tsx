import { circleStyle, partsOfSpeech } from "./AddCard/PartOfSpeechModal";

const LanguListItem = ({ term, definition, pos, needsRevision, dir }: { term: string, definition: string, pos: string, needsRevision: boolean, dir: "ltr" | "rtl" }) => {
    return (
        <article style={needsRevision ? { backgroundColor: "#FAF1ED" } : {}}>
            <div style={{ alignSelf: "center", justifySelf: "start", fontSize: "1.3rem", fontWeight: "bold", paddingLeft: "1rem" }}>{term}</div>
            <div style={{ backgroundColor: partsOfSpeech[pos].color, alignSelf: "center", ...circleStyle }}>{pos}</div>
            <div style={{ justifySelf: "start", paddingLeft: "1rem", gridArea: "definition", textAlign: dir === "ltr" ? "left" : "right" }}>{definition}</div>
        </article>
    );
};

export default LanguListItem;