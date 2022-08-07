import GoBack from "./GoBack";
import Logo from "./Logo";
import OptionsToggler from "./OptionsToggler";
import SearchToggler from "./SearchToggler";
import classes from './Header.module.css';

const HeaderInPacket = () => {
    return (
        <nav className={classes.navbar}>
            <GoBack icon="arrow" goTo="LEARNING-BOX" />
            <Logo />
            <SearchToggler />
            <OptionsToggler fullOptionsMenu={true} />
        </nav>
    );
};

export default HeaderInPacket;