import { useParams } from "react-router-dom";
import GoBack from "./GoBack";
import Logo from "./Logo";
import classes from './Header.module.css';

const HeaderInAddCard = () => {
    const params = useParams();
    return (
        <nav className={classes.navbar}>
            <GoBack link={`/${params.language}?show=list`} icon="x" />
            <Logo />
        </nav>
    )
};

export default HeaderInAddCard;