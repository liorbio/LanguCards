import { CSSProperties, MouseEventHandler } from "react";
import { useTranslation } from 'react-i18next';

const uncheckedBall: CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "20px",
    backgroundColor: "#e6e6e6",
    border: "4px solid #e6e6e6"
};
const checkedBall: CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "20px",
    backgroundColor: "#86A1FF",
    border: "4px solid #e6e6e6"
}

const memorizationLevels = [
    'not_memorized',
    'barely_memorized',
    'almost_memorized',
    'fully_memorized'
]

const Memorization = ({ chosenLevel, handleSetMemorization }: { chosenLevel: number, handleSetMemorization: (level: number) => void }) => {
    const { t } = useTranslation();
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        handleSetMemorization(parseInt(event.currentTarget.id));
    }
    return (
        <>
            <div style={{ marginTop: "3vh", display: "flex", width: "70vw", justifyContent: "space-evenly" }}>
                {memorizationLevels.map((level, idx) => <div onClick={handleClick} id={`${idx}`} key={`mem${idx}`} style={idx > chosenLevel ? uncheckedBall : checkedBall }></div>)}
            </div>
            <p style={{ fontSize: "1.2rem", color: "#6e6e6e", marginTop: "0.8rem" }}>{t(memorizationLevels[chosenLevel])}</p>
        </>
    )
};

export default Memorization;