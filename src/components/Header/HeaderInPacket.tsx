import GoBack from "./GoBack";
import Logo from "./Logo";
import OptionsToggler from "./OptionsToggler";
import SearchToggler from "./SearchToggler";
import classes from './Header.module.css';
import { useRef, useState } from "react";
import { Transition } from 'react-transition-group';
import { TransitionStyles } from "../../types/types";
import SearchBar from './search-related/SearchBar';
import SearchMenu from './search-related/SearchMenu';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { searchActions } from "../../store/redux-logic";

const navBarTransition: TransitionStyles = {
    entering: { right: 0 },
    entered: { right: "100vw" },
    exiting: { right: 0 },
    exited: { right: 0 },
    unmounted: { right: 0 }
};
const searchBarTransition: TransitionStyles = {
    entering: { right: "-100vw" },
    entered: { right: 0 },
    exiting: { right: "-100vw" },
    exited: { right: "-100vw" },
    unmounted: { right: "-100vw" }
};
const searchMenuTransition: TransitionStyles = {
    entering: { top: "-10.5rem" },
    entered: { top: "3.75rem" },
    exiting: { top: "-10.5rem" },
    exited: { top: "-10.5rem" },
    unmounted: { top: "-10.5rem" }
};
const clearSearchTransition: TransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 0 },
    exiting: { opacity: 0 },
    exited: { opacity: "100%" },
    unmounted: { opacity: 0 }
}

const HeaderInPacket = () => {
    const dispatch = useAppDispatch();
    const [inSearchMode, setSearchMode] = useState(false);
    const searchCriteriaOn = useAppSelector(state => {
        if (state.search.searchVal.length > 0) return true;
        if (state.search.nrFilter === 1) return true;
        if (state.search.diaFilter.length > 0 || state.search.memoFilter.length > 0 || state.search.posFilter.length > 0 || state.search.tagsFilter.length > 0) return true;
        return false;
    });

    // 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠
    //
    // When inSearchMode obv show searchBar+filterMenu
    // When not inSearchMode, if there are searchCriteria (listen to Redux) then show <ClearSearch> button (hovering south of header)
    //
    // 🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠

    const nodeRef = useRef(null);
    const inputRef = useRef<null | HTMLInputElement>(null);

    const toggleSearchMode = () => {
        if (inSearchMode === false) {
            setTimeout(() => {
                inputRef.current!.focus();
                inputRef.current!.click();
            }, 400);
        } else {
            inputRef.current!.blur();
        }
        setSearchMode(prev => !prev);
    }

    return (
        <Transition nodeRef={nodeRef} in={inSearchMode} timeout={0}>
            {(state) => (
                <>
                    <nav className={`${classes.navbar} ${classes.packetNavBar}`} ref={nodeRef} style={navBarTransition[state]}>
                        <GoBack icon="arrow" goTo="LEARNING-BOX" />
                        <Logo />
                        <SearchToggler toggle={toggleSearchMode} searchActive={searchCriteriaOn} />
                        {searchCriteriaOn && <div className={classes.halo} onClick={toggleSearchMode}></div>}
                        <OptionsToggler fullOptionsMenu={true} />
                        {searchCriteriaOn && <div className={classes.clearSearchButton} style={clearSearchTransition[state]} onClick={() => dispatch(searchActions.clearSearch())}>clear search</div>}
                    </nav>
                    <SearchBar nodeRef={nodeRef} ref={inputRef} transitionStyle={searchBarTransition[state]} toggler={toggleSearchMode} />
                    <SearchMenu nodeRef={nodeRef} transitionStyle={searchMenuTransition[state]}/>
                    {inSearchMode && <div className={classes.clickPreventionWhileSearching} onClick={toggleSearchMode}></div>}
                </>
            )}
        </Transition>
    );
};

export default HeaderInPacket;