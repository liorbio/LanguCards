import { MagnifVector } from "../../generatedIcons";
import classes from './Header.module.css';

const SearchToggler = ({ toggle }: { toggle: () => void }) => {
    return (
        <div onClick={toggle} className={classes.searchToggler}>
            <MagnifVector />
        </div>
    )
};

export default SearchToggler;