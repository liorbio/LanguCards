import Logo from "./Logo";
import classes from './Header.module.css';

const HeaderInAddCard = () => {
    return (
        <nav className={classes.navbar}>
            <Logo />
        </nav>
    )
};

export default HeaderInAddCard;