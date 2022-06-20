import { useLocation } from "react-router-dom";
import GoBack from "./GoBack";
import Logo from "./Logo";
import classes from './Header.module.css';

const HeaderInAddCard = () => {
    const location = useLocation();
    return (
        <nav className={classes.navbar}>
            <GoBack link={location.pathname.replace("/add", "")} icon="x" />
            <Logo />
        </nav>
    )
};

export default HeaderInAddCard;