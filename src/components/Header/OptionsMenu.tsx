import classes from "./OptionsMenu.module.css"
import { NavLink, useLocation } from "react-router-dom";
import switchIcon from '../../icons/switchIcon.png';
import puzzleIcon from '../../icons/puzzleIcon.png';
import SettingsIcon from '../../icons/SettingsIcon.png';
import LoginIcon from '../../icons/LoginIcon.png';

const OptionsMenuOption = ({ link, label, icon }: { link: string, label: string, icon: string }) => {
    return (
        <div className={classes.option}>
            <NavLink to={link}>
                <img src={icon} alt={label} /> &nbsp; 
                {label}
            </NavLink>
        </div>
    )
};

// Options in menu are shown according to the below object literal:
let options = { switchView: false, play: false, settings: false, login: false };

const OptionsMenu = () => {
    const location = useLocation();
    // Each location requires a different set of options in the menu:
    if (location.pathname === "/") {     
        options = { switchView: false, play: false, settings: true, login: true }; 
    } else if (location.pathname === "/packet") {
        options = { switchView: true, play: true, settings: true, login: true };
    }

    return (
        <div className={classes.optionsMenu}>
            { options.switchView &&  <OptionsMenuOption link="/packet" label="switch view" icon={switchIcon} />}
            { options.play &&  <OptionsMenuOption link="/packet" label="play" icon={puzzleIcon} />}
            { options.settings &&  <OptionsMenuOption link="/packet" label="settings" icon={SettingsIcon} />}
            { options.login &&  <OptionsMenuOption link="/packet" label="login" icon={LoginIcon} />}
        </div>
    )
};

export default OptionsMenu;