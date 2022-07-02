import GoBack from "./GoBack";
import Logo from "./Logo";
import classes from './Header.module.css';

const HeaderInAddCard = () => {
    return (
        <nav className={classes.navbar}>
            <GoBack icon="x" />
            <Logo />
        </nav>
    )
};

export default HeaderInAddCard;