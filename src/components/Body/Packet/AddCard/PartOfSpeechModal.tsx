import { CSSProperties, MouseEventHandler } from "react";
import ModalBackgroundClicksPrevention from "../../../../UI/ModalBackgroundClicksPrevention";

export const partsOfSpeech: { [name: string]: { name: string, color: string } } = {
    adj: { name: "Adjective", color: "#FED19D" },
    v: { name: "Verb", color: "#B7EDC6" },
    n: { name: "Noun", color: "#FFC7C7" },
    cn: { name: "Conjunction", color: "#B7D9ED" },
    ij: { name: "Interjection", color: "#E2B7ED" },
    adv: { name: "Adverb", color: "#ECEDB7" },
    st: { name: "Special Structure", color: "#B7EDE6" },
    id: { name: "Idiom", color: "#F18888" },
    ex: { name: "Expression", color: "#CFD7E2" }
};
const modalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    zIndex: 5,
    backgroundColor: "white",
    width: "70vw",
    left: "15vw",
    top: "13vh",
    borderRadius: "15px",
    boxShadow: "0px 3px 7px 0px #00000006"
};
export const circleStyle: CSSProperties = {
    height: "26px",
    width: "26px",
    borderRadius: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
    justifySelf: "center"
}

const PartOfSpeechModal = ({ handleChoose, handleExit }: { handleChoose: (pos: string) => void, handleExit: () => void }) => {
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        handleChoose(event.currentTarget.id);
    };
    return (
        <>  
            <div style={modalStyle}>
                {Object.keys(partsOfSpeech).map(key => {
                    return (
                        <div onClick={handleClick} style={{ display: "grid", gridTemplateColumns: "20% 1fr 75%", padding: "11px", alignItems: "center" }} key={key} id={key}>
                            <div style={{ backgroundColor: partsOfSpeech[key].color, ...circleStyle }}>{key}</div>
                            <span style={{ gridArea: "1 / 3" }}>{partsOfSpeech[key].name}</span>
                        </div>
                    )
                })}
            </div>
            <ModalBackgroundClicksPrevention handler={handleExit} />

        </>
    )
};

export default PartOfSpeechModal;