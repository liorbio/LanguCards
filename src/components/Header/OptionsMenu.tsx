import classes from "./OptionsMenu.module.css"
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();

    const menuInMain = (
        <div dir={t('globalDir')} className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link="/" label={t("settings")} icon={<SettingsIcon />} />
            <OptionsMenuOption link="/" label={t("login")} icon={<LoginIcon />} />
        </div>
    );
    const menuInPacket = (
        <div dir={t('globalDir')} className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link={`?show=${searchParams.get('show') === "coupons" ? "list": "coupons"}`} label={t("switch_view")} icon={<SwitchIcon />} />
            <OptionsMenuOption link="/" label={t("play")} icon={<PuzzleIcon />} />
            <OptionsMenuOption link="/" label={t("settings")} icon={<SettingsIcon />} />
            <OptionsMenuOption link="/" label={t("login")} icon={<LoginIcon />} />
        </div>
    );

    if (full) {
        return menuInPacket;
    } else {
        return menuInMain;
    }
};

export default OptionsMenu;