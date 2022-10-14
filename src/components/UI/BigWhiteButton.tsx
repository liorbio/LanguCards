import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './BigWhiteButton.module.css';

const LONG_PRESS_DURATION = 500;

const BigWhiteButton = ({ text, action, additionalClasses, longPressAction }: { text: string, action: () => void, additionalClasses?: string, longPressAction?: () => void }) => {
    const { t } = useTranslation();
    const [showPopUp, setShowPopUp] = useState(false);

    let timer: NodeJS.Timeout;

    const touchStart = () => {
        timer = setTimeout(() => {
            setShowPopUp(true);
        }, LONG_PRESS_DURATION);
    }
    const touchEnd = () => {
        if (timer) clearTimeout(timer);
    }
    const clickHandler = () => {
        if (showPopUp) setShowPopUp(false);
        if (!showPopUp) action();
    };

    return (
        <div className={`${classes.bigWhiteButton} ${additionalClasses}`} onClick={clickHandler} dir={t('globalDir')} onTouchStart={touchStart} onTouchEnd={touchEnd}>
            <h1>{text}</h1>
            {longPressAction && showPopUp && <div className={classes.popUp} onClick={() => { longPressAction(); setShowPopUp(false); }}>{t('edit')}</div>}
        </div>
    );
};

export default BigWhiteButton;