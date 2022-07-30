import { useState } from "react";
import { useTranslation } from "react-i18next";
import Instruction from "./Instruction";
import instructionClasses from './Instruction.module.css';
import { set } from 'idb-keyval';

const Tutorial = ({ unmountTutorial }: { unmountTutorial: () => void }) => {
    const [stageIndex, setStageIndex] = useState(0);
    
    const { t } = useTranslation();

    const handleNextStage = () => {
        setStageIndex(s => (s+1)%5); // 0,1,2,3,4,0,1,2,...
    };
    const handleContinue = () => {
        unmountTutorial();
        set('seenTutorial', true);
    };
    return (
        <>
            {stageIndex === 4 && <div onClick={handleContinue} className={`${instructionClasses.instructionBubble} ${instructionClasses.bigBubble}`}>{t('continue')}</div>}
            <Instruction stageIndex={stageIndex} nextStage={handleNextStage} />
        </>
    );
};

export default Tutorial;