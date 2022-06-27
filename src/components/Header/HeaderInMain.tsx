import classes from './Header.module.css';
import Logo from './Logo';
import OptionsToggler from './OptionsToggler';

const HeaderInMain = () => {
    return (
        <nav className={classes.navbar}>
            <Logo />
            <OptionsToggler fullOptionsMenu={false} />
        </nav>
    )
};

export default HeaderInMain;