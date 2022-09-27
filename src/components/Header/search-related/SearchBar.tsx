import { CSSProperties, MutableRefObject, useEffect, useState } from "react";
import GoBackArrow from "../../../generatedIcons/GoBackArrow";
import XIcon from '../../../generatedIcons/XVector';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { searchActions } from "../../../store/redux-logic";
import classes from '../Header.module.css';

const DEBOUNCE_LAG = 800;

const SearchBar = ({ nodeRef, inputRef, transitionStyle, toggler }: { nodeRef: MutableRefObject<null>, inputRef: MutableRefObject<HTMLInputElement | null>, transitionStyle: CSSProperties, toggler: () => void }) => {
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useAppDispatch();
    const searchValActuallyCleared = useAppSelector(state => state.search.searchVal === "");

    useEffect(() => {
        if (searchValActuallyCleared) setSearchVal("");
    }, [searchValActuallyCleared]);

    useEffect(() => {
        const debouncingTimer = setTimeout(() => {
            dispatch(searchActions.updateSearchVal(searchVal));
        }, DEBOUNCE_LAG);

        return () => {
            clearTimeout(debouncingTimer);
        }
    }, [dispatch, searchVal]);

    return (
        <div className={classes.searchBar} ref={nodeRef} style={transitionStyle}>
            <div onClick={toggler} className={classes.goBack}><GoBackArrow /></div>
            <input type="text" ref={inputRef} value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
            {searchVal.length > 0 && <div onClick={() => setSearchVal("")} className={classes.xSymbol}><XIcon /></div>}
        </div>
    )
};

export default SearchBar;