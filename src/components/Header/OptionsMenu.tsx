import classes from "./OptionsMenu.module.css"
import { Link, useSearchParams } from "react-router-dom";
import { SwitchIcon, PuzzleIcon, SettingsIcon, LoginIcon } from "../../generatedIcons";

const OptionsMenuOption = ({ link, label, icon }: { link: string, label: string, icon: JSX.Element }) => {  
    return (
        <div className={classes.option}>
            <Link to={link}>
                <div style={{ justifySelf: "center" }}>{icon} </div>
                {label}
            </Link>
        </div>
    )
};

const OptionsMenu = ({ full, toggleMenu }: { full: boolean, toggleMenu: () => void }) => {
    const [searchParams] = useSearchParams();

    const menuInMain = (
        <div className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link="/" label="settings" icon={<SettingsIcon />} />
            <OptionsMenuOption link="/" label="login" icon={<LoginIcon />} />
        </div>
    );
    const menuInPacket = (
        <div className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link={`?show=${searchParams.get('show') === "coupons" ? "list": "coupons"}`} label="switch view" icon={<SwitchIcon />} />
            <OptionsMenuOption link="/" label="play" icon={<PuzzleIcon />} />
            <OptionsMenuOption link="/" label="settings" icon={<SettingsIcon />} />
            <OptionsMenuOption link="/" label="login" icon={<LoginIcon />} />
        </div>
    );

    if (full) {
        return menuInPacket;
    } else {
        return menuInMain;
    }
};

export default OptionsMenu;