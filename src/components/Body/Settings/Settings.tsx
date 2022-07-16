import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './Settings.module.css';

const languageCodes = {
    en: "En",
    he: "עב",
    ar: "عر"
};

const LanguageButton = ({ lang, chosen, handleChangeLanguage }: { lang: "en" | "he" | "ar", chosen: boolean, handleChangeLanguage: (lang: "en" | "he" | "ar") => void }) => {
    const handleClick = () => {
        if (!chosen) {
            handleChangeLanguage(lang);
        }
    };

    return <div onClick={handleClick} className={`${classes.languageButton} ${chosen && classes.chosenButton}`}>
        {languageCodes[lang]}
    </div>
};

const Settings = () => {
    const { t, i18n } = useTranslation();

    const [interfaceLanguage, setInterfaceLanguage] = useState<string | null>(null);

    useEffect(() => {
        let lang = localStorage.getItem("i18nextLng");
        console.log(lang)
        if (!lang) { lang = "en" }
        setInterfaceLanguage(lang);
    }, []);

    const handleChangeLanguage = (lang: "en" | "he" | "ar") => {
        setInterfaceLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
        i18n.changeLanguage(lang);
    }

    return (
        <div className={classes.settingsWrapper}>
            <h1 style={{ textAlign: t("globalDir") === "ltr" ? "left" : "right" }}>{t("settings")}</h1>
            <h3>{t("interface_language")}</h3>
            <div className={classes.languageChoiceRow}>
                <LanguageButton lang="en" chosen={interfaceLanguage === "en"} handleChangeLanguage={handleChangeLanguage} />
                <LanguageButton lang="he" chosen={interfaceLanguage === "he"} handleChangeLanguage={handleChangeLanguage} />
                <LanguageButton lang="ar" chosen={interfaceLanguage === "ar"} handleChangeLanguage={handleChangeLanguage} />
            </div>
        </div>
    )
};

export default Settings;