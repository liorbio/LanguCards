import ReactDOM from 'react-dom';
import { CSSProperties, MutableRefObject, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { searchActions } from "../../../store/redux-logic";
import TextSwitchingToggleButtonWithDeselect from "../../UI/TextSwitchingToggleButtonWithDeselect";
import classes from '../Header.module.css';
import FilterButton from "./FilterButton";
import MoreFilters from './MoreFilters';
import portalElement from '../../../elements/portalElement';

const SearchMenu = ({ nodeRef, transitionStyle }: { nodeRef: MutableRefObject<null>, transitionStyle: CSSProperties }) => {
    const dispatch = useAppDispatch();
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const sortAlphabetically = useAppSelector(state => state.search.sortAlphabetically);
    const sortByDate = useAppSelector(state => state.search.sortByDate);
    const selectedSorter = useAppSelector(state => state.search.selectedSorter);
    const nrFilterOn = useAppSelector(state => !!state.search.nrFilter);
    const moreFiltersOn = useAppSelector(state => {
        if (state.search.diaFilter.length > 0 || state.search.posFilter.length > 0 || state.search.memoFilter.length > 0 || state.search.tagsFilter.length > 0) {
            return true;
        } else {
            return false;
        }
    });

    return (
        <div className={classes.searchMenu} ref={nodeRef} style={transitionStyle}>
            <div className={classes.sortBy}>Sort by:
                <TextSwitchingToggleButtonWithDeselect textOne="new - old" textTwo="old - new" showTextOneState={sortByDate === 1} selected={selectedSorter === "date"} handler={() => dispatch(searchActions.pressSorter("date"))} />
                <TextSwitchingToggleButtonWithDeselect textOne="A - Z" textTwo="Z - A" showTextOneState={sortAlphabetically === 1} selected={selectedSorter === "alphabetical"} handler={() => dispatch(searchActions.pressSorter("alphabetical"))} />
            </div>
            <div className={classes.sortBy} style={{ marginTop: "1.2rem" }}>
                <FilterButton text="needs revision" selected={nrFilterOn} handler={() => dispatch(searchActions.pressNrFilter())} />
                <FilterButton text="more filters..." selected={moreFiltersOn} handler={() => setShowMoreFilters(prev => !prev)} />
                {showMoreFilters && ReactDOM.createPortal(<MoreFilters handler={() => dispatch(searchActions.clearMoreFilters())} toggler={() => setShowMoreFilters(false)} />, portalElement)}
            </div>
        </div>
    )
};

export default SearchMenu;