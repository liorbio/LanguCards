import { CSSProperties, MutableRefObject, useEffect, useState, forwardRef, ForwardedRef } from "react";
import GoBackArrow from "../../../generatedIcons/GoBackArrow";
import XIcon from '../../../generatedIcons/XVector';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { searchActions } from "../../../store/redux-logic";
import classes from '../Header.module.css';

const DEBOUNCE_LAG = 800;

type propsType = { nodeRef: MutableRefObject<null>, transitionStyle: CSSProperties, toggler: () => void };

const SearchBar = (props: propsType, ref: ForwardedRef<HTMLInputElement>) => {
    const { nodeRef, transitionStyle, toggler } = props;
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useAppDispatch();
    const searchValActuallyCleared = useAppSelector(state => state.search.searchVal === "");
    const thisSearchWasDone = useAppSelector(state => state.search.thisSearchWasDone);

    useEffect(() => {
        if (searchValActuallyCleared) setSearchVal("");
    }, [searchValActuallyCleared]);

    useEffect(() => {
        if (!thisSearchWasDone) {
            const debouncingTimer = setTimeout(() => {
                dispatch(searchActions.updateSearchVal(searchVal));
            }, DEBOUNCE_LAG);

            return () => {
                clearTimeout(debouncingTimer);
            }
        }
    }, [dispatch, searchVal, thisSearchWasDone]);

    return (
        <div className={classes.searchBar} ref={nodeRef} style={transitionStyle}>
            <div onClick={toggler} className={classes.goBack}><GoBackArrow /></div>
            <input type="text" ref={ref} value={searchVal} onChange={(event) => setSearchVal(event.target.value)} />
            {searchVal.length > 0 && <div onClick={() => setSearchVal("")} className={classes.xSymbol}><XIcon /></div>}
        </div>
    )
};

export default forwardRef(SearchBar);