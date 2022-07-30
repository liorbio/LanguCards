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

const Instruction = ({ stageIndex, nextStage } : { stageIndex: number, nextStage: () => void }) => { 
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.wholeScreenClickStealer} onClick={nextStage}></div>
            <div className={`${addCardClasses.hole} ${addCardClasses[stages[stageIndex].cssClass]} ${t('globalDir') === "rtl" ? addCardClasses[`${stages[stageIndex].cssClass}Rtl`] : null}`} style={stageIndex === 4 ? { padding: 0 } : {}}></div>
            <div dir={t('globalDir')} className={classes.instructionBubble} style={stageIndex !== 4 ? { width: "70vw", left: "10vw" } : { width: "30vw", left: "30vw"}}>{t(stages[stageIndex].text)}</div>
        </>
    );
};

export default Instruction;