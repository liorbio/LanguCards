import { MagnifVector } from "../../generatedIcons";
import classes from './Header.module.css';

const SearchToggler = ({ toggle, searchActive }: { toggle: () => void, searchActive: boolean }) => {
    return (
        <div onClick={toggle} className={classes.searchToggler}>
            <MagnifVector style={searchActive ? { filter: "invert(16%) sepia(94%) saturate(5291%) hue-rotate(314deg) brightness(88%) contrast(109%)" } : {}} />
        </div>
    )
};

export default SearchToggler;