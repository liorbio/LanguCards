import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useTagsAndDialects } from "../../../hooks/useTagsAndDialects";
import { searchActions } from "../../../store/redux-logic";
import DefaultModal from "../../UI/DefaultModal";
import FilterButton from "./FilterButton";
import classes from './MoreFilters.module.css';

const partsOfSpeech: {[name: string]: string} = {
    "adjective": "adj",
    "verb": "v",
    "noun": "n",
    "conjunction": "cn",
    "interjection": "ij",
    "adverb": "adv",
    "special_structure": "st",
    "idiom": "id",
    "expression": "ex"
}
const memorizationLevels = ["1", "2", "3", "4"];

const MoreFilters = ({ handler, toggler }: { handler: () => void, toggler: () => void }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const posFilter = useAppSelector(state => state.search.posFilter);
    const memoFilter = useAppSelector(state => state.search.memoFilter);
    const tagsFilter = useAppSelector(state => state.search.tagsFilter);
    const diaFilter = useAppSelector(state => state.search.diaFilter);

    const { tags, dialects, error } = useTagsAndDialects();
    
    return (
        <DefaultModal title={t('more filters')} topRightX={true} buttonOne={t('apply')} buttonTwo={t('clear')} handler={handler} toggler={toggler} modalType="Dialogue">
            <div className={classes.modalBody}>
                <div className={classes.filterSection}>
                    <h4>{t('part of speech')}</h4>
                    <div className={classes.filterPack}>
                        {Object.keys(partsOfSpeech).map(pos => <FilterButton text={t(pos)} key={pos} selected={posFilter.includes(partsOfSpeech[pos])} handler={() => dispatch(searchActions.pressOnPos(partsOfSpeech[pos]))} />)}
                    </div>
                </div>
                <div className={classes.filterSection}>
                    <h4>{t('memorization level')}</h4>
                    <div className={classes.filterPack} style={{ gap: "1rem", justifyContent: "center" }}>
                        {memorizationLevels.map(m => <FilterButton text={m} key={m} selected={memoFilter.includes(m)} handler={() => dispatch(searchActions.pressOnMemo(m))} />)}
                    </div>
                </div>
                {tags.length > 0 && !error && <div className={classes.filterSection}>
                    <h4>{t('tags')}</h4>
                    <div className={classes.filterPack}>
                        {tags.map(t => <FilterButton text={t} key={t} selected={tagsFilter.includes(t)} handler={() => dispatch(searchActions.pressOnTag(t))} />)}
                    </div>
                </div>}
                {dialects.length > 0 && !error && <div className={classes.filterSection}>
                    <h4>{t('dialect')}</h4>
                    <div className={classes.filterPack}>
                        {dialects.map(d => <FilterButton text={d} key={d} selected={diaFilter.includes(d)} handler={() => dispatch(searchActions.pressOnDia(d))} />)}
                    </div>
                </div>}
            </div>
        </DefaultModal>
    )
};

export default MoreFilters;