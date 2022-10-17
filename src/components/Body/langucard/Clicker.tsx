import FloatingButton from "../../UI/FloatingButton";
import { GoBackVector } from "../../../generatedIcons";
import classes from './LanguCard.module.css';
import { createSearchParams, useNavigate } from "react-router-dom";

const filterString = "invert(83%) sepia(0%) saturate(1383%) hue-rotate(143deg) brightness(83%) contrast(88%)";

const Clicker = ({ prevCardId, nextCardId }: { prevCardId: string | null, nextCardId: string | null }) => {
    const navigate = useNavigate();

    const goToPrev = () => {
        if (!!prevCardId) {
            navigate({
                search: `${createSearchParams({ cardid: prevCardId })}`
            });
        }
    }

    const goToNext = () => {
        if (!!nextCardId) {
            navigate({
                search: `${createSearchParams({ cardid: nextCardId })}`
            });
        }
    }

    return (
        <div className={classes.clicker}>
            <FloatingButton action={goToPrev} active={!!prevCardId}>
                <GoBackVector style={{ marginRight: "5px", filter: !!prevCardId ? "" : filterString }} />
            </FloatingButton>
            <FloatingButton action={goToNext} active={!!nextCardId}>
                <GoBackVector style={{ marginLeft: "5px", transform: "scaleX(-1)", filter: !!nextCardId ? "" : filterString }} />
            </FloatingButton>
        </div>
    )
};

export default Clicker;