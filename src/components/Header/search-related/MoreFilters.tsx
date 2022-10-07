import { useEffect, useState } from "react";
import { backendUrl } from "../../../backend-variables/address";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
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
    "special structure": "st",
    "idiom": "id",
    "expression": "ex"
}
const memorizationLevels = ["1", "2", "3", "4"];

const MoreFilters = ({ handler, toggler }: { handler: () => void, toggler: () => void }) => {
    const dispatch = useAppDispatch();
    const authToken = useAppSelector(state => state.auth.jwt);
    const packetId = useAppSelector(state => state.packet.packetId);
    const posFilter = useAppSelector(state => state.search.posFilter);
    const memoFilter = useAppSelector(state => state.search.memoFilter);
    const tagsFilter = useAppSelector(state => state.search.tagsFilter);
    const diaFilter = useAppSelector(state => state.search.diaFilter);

    // 🦋 useTagsAndDialects

    const [tags, setTags] = useState([]);
    const [dialects, setDialects] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/packets/${packetId}/tags-and-dialects`, {
            method: 'GET',
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setTags(res.tags);
                setDialects(res.dialects);
            }).catch((err) => console.log(`Error fetching dialects and tags: ${err}`));
    }, [packetId, authToken]);
    
    return (
        <DefaultModal title="more filters" topRightX={true} buttonOne="APPLY" buttonTwo="CLEAR" handler={handler} toggler={toggler} modalType="Dialogue">
            <div className={classes.modalBody}>
                <div className={classes.filterSection}>
                    <h4>part of speech</h4>
                    <div className={classes.filterPack}>
                        {Object.keys(partsOfSpeech).map(pos => <FilterButton text={pos} key={pos} selected={posFilter.includes(partsOfSpeech[pos])} handler={() => dispatch(searchActions.pressOnPos(partsOfSpeech[pos]))} />)}
                    </div>
                </div>
                <div className={classes.filterSection}>
                    <h4>memorization level</h4>
                    <div className={classes.filterPack} style={{ gap: "1rem", justifyContent: "center" }}>
                        {memorizationLevels.map(m => <FilterButton text={m} key={m} selected={memoFilter.includes(m)} handler={() => dispatch(searchActions.pressOnMemo(m))} />)}
                    </div>
                </div>
                {tags.length > 0 && <div className={classes.filterSection}>
                    <h4>tags</h4>
                    <div className={classes.filterPack}>
                        {tags.map(t => <FilterButton text={t} key={t} selected={tagsFilter.includes(t)} handler={() => dispatch(searchActions.pressOnTag(t))} />)}
                    </div>
                </div>}
                {dialects.length > 0 && <div className={classes.filterSection}>
                    <h4>dialect</h4>
                    <div className={classes.filterPack}>
                        {dialects.map(d => <FilterButton text={d} key={d} selected={diaFilter.includes(d)} handler={() => dispatch(searchActions.pressOnDia(d))} />)}
                    </div>
                </div>}
            </div>
        </DefaultModal>
    )
};

export default MoreFilters;