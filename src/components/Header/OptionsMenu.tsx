import classes from "./OptionsMenu.module.css"
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { SwitchIcon, PuzzleIcon, SettingsIcon, LogoutIcon } from "../../generatedIcons";
import { useAppSelector } from "../../hooks/reduxHooks";

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
    const loggedIn = useAppSelector(state => !!state.auth.jwt);

    const menuInMain = (
        <div dir={t('globalDir')} className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link="/settings" label={t("settings")} icon={<SettingsIcon />} />
            {loggedIn && <OptionsMenuOption link="/logout" label={t("logout")} icon={<LogoutIcon />} />}
        </div>
    );
    const menuInPacket = (
        <div dir={t('globalDir')} className={classes.optionsMenu} onClick={toggleMenu}>
            <OptionsMenuOption link={`?show=${searchParams.get('show') === "coupons" ? "list": "coupons"}`} label={t("switch_view")} icon={<SwitchIcon />} />
            {/*<OptionsMenuOption link="/" label={t("play")} icon={<PuzzleIcon />} />*/}
            <OptionsMenuOption link="/settings" label={t("settings")} icon={<SettingsIcon />} />
            <OptionsMenuOption link="/logout" label={t("logout")} icon={<LogoutIcon />} />
        </div>
    );

    if (full) {
        return menuInPacket;
    } else {
        return menuInMain;
    }
};

export default OptionsMenu;