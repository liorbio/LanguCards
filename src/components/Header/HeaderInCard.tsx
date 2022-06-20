import Logo from "./Logo";
import classes from './Header.module.css';

const HeaderInCard = () => {
    return (
        <nav className={classes.navbar}>
            <Logo />
        </nav>
    )
};

export default HeaderInCard;