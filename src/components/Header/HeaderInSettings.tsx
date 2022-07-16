import Logo from "./Logo";
import classes from './Header.module.css';
import GoBack from "./GoBack";

const HeaderInSettings = () => {
    return (
        <nav className={classes.navbar}>
            <GoBack icon="arrow" />
            <Logo />
        </nav>
    )
};

export default HeaderInSettings;