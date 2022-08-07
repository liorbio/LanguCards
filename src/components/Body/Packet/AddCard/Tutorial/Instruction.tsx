import { useTranslation } from 'react-i18next';
import addCardClasses from '../AddCard.module.css';
import classes from './Instruction.module.css';

const stages = [
    { text: 'term_tutorial', cssClass: 'termHole'},
    { text: 'pos_tutorial', cssClass: 'posHole'},
    { text: 'needs_revision_tutorial', cssClass: 'needsRevisionHole'},
    { text: 'tags_tutorial', cssClass: 'tagsHole'},
    { text: 'replay_tutorial', cssClass: ''}
];

const Instruction = ({ stageIndex, nextStage, packetDir } : { stageIndex: number, nextStage: () => void, packetDir: "ltr" | "rtl" }) => { 
    const { t } = useTranslation();
    const direction = ([0,1].includes(stageIndex) && packetDir === "rtl") || ([2,3,4].includes(stageIndex) && t('globalDir') === "rtl") ? "rtl" : "ltr";
    return (
        <>
            <div className={classes.wholeScreenClickStealer} onClick={nextStage}></div>
            <div className={`${addCardClasses.hole} ${addCardClasses[stages[stageIndex].cssClass]} ${direction === "rtl" ? addCardClasses[`${stages[stageIndex].cssClass}Rtl`] : null}`} style={stageIndex === 4 ? { padding: 0 } : {}}></div>
            <div dir={t('globalDir')} className={classes.instructionBubble} style={stageIndex !== 4 ? { width: "70vw", left: "10vw" } : { width: "30vw", left: "30vw"}}>{t(stages[stageIndex].text)}</div>
        </>
    );
};

export default Instruction;