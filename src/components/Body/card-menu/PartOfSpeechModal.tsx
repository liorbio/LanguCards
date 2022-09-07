import { CSSProperties, MouseEventHandler } from "react";
import { useTranslation } from 'react-i18next';
import ModalBackgroundClicksPrevention from "../../UI/ModalBackgroundClicksPrevention";

export const partsOfSpeech: { [name: string]: { name: string, color: string } } = {
    adj: { name: "adjective", color: "#FED19D" },
    v: { name: "verb", color: "#B7EDC6" },
    n: { name: "noun", color: "#FFC7C7" },
    cn: { name: "conjunction", color: "#B7D9ED" },
    ij: { name: "interjection", color: "#E2B7ED" },
    adv: { name: "adverb", color: "#ECEDB7" },
    st: { name: "special_structure", color: "#B7EDE6" },
    id: { name: "idiom", color: "#F18888" },
    ex: { name: "expression", color: "#CFD7E2" }
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
    const { t } = useTranslation();
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        handleChoose(event.currentTarget.id);
    };
    return (
        <>  
            <div style={modalStyle}>
                {Object.keys(partsOfSpeech).map(key => {
                    return (
                        <div dir={t('globalDir')} onClick={handleClick} style={{ display: "grid", gridTemplateColumns: "20% 1fr 75%", padding: "11px", alignItems: "center" }} key={key} id={key}>
                            <div style={{ backgroundColor: partsOfSpeech[key].color, ...circleStyle }}>{key}</div>
                            <span style={{ gridArea: "1 / 3" }}>{t(partsOfSpeech[key].name)}</span>
                        </div>
                    )
                })}
            </div>
            <ModalBackgroundClicksPrevention handler={handleExit} />

        </>
    )
};

export default PartOfSpeechModal;