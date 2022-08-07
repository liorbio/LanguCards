import { useState } from "react";
import { useTranslation } from "react-i18next";
import Instruction from "./Instruction";
import instructionClasses from './Instruction.module.css';
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { settingsActions } from "../../../../../store/redux-logic";

const Tutorial = ({ packetDir }: { packetDir: "ltr" | "rtl" }) => {
    const [stageIndex, setStageIndex] = useState(0);
    const dispatch = useAppDispatch();
    
    const { t } = useTranslation();

    const handleNextStage = () => {
        setStageIndex(s => (s+1)%5); // 0,1,2,3,4,0,1,2,...
    };
    const handleContinue = () => {
        dispatch(settingsActions.seeTutorial());
    };
    return (
        <>
            {stageIndex === 4 && <div onClick={handleContinue} className={`${instructionClasses.instructionBubble} ${instructionClasses.bigBubble}`}>{t('continue')}</div>}
            <Instruction stageIndex={stageIndex} nextStage={handleNextStage} packetDir={packetDir} />
        </>
    );
};

export default Tutorial;