import { useState } from "react";
import { useTranslation } from "react-i18next";
import Instruction from "./Instruction";
import instructionClasses from './Instruction.module.css';
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { settingsActions } from "../../../../store/redux-logic";
import { backendUrl } from "../../../../backend-variables/address";

const Tutorial = ({ writingDir }: { writingDir: "ltr" | "rtl" }) => {
    const dispatch = useAppDispatch();
    const [stageIndex, setStageIndex] = useState(0);
    const authToken = useAppSelector(state => state.auth.jwt);
    
    const { t } = useTranslation();

    const handleNextStage = () => {
        setStageIndex(s => (s+1)%5); // 0,1,2,3,4,0,1,2,...
    };
    const handleContinue = () => {
        fetch(`${backendUrl}/seen-tutorial`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => {
                dispatch(settingsActions.seeTutorial());
                console.log("Success marking 'seen tutorial'")
            })
            .catch((err) => console.log(`Error marking 'seen tutorial': ${err}`));
    };
    return (
        <>
            {stageIndex === 4 && <div onClick={handleContinue} className={`${instructionClasses.instructionBubble} ${instructionClasses.bigBubble}`}>{t('continue')}</div>}
            <Instruction stageIndex={stageIndex} nextStage={handleNextStage} writingDir={writingDir} />
        </>
    );
};

export default Tutorial;