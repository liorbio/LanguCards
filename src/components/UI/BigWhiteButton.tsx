import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './BigWhiteButton.module.css';

const BigWhiteButton = ({ text, action, overrideStyle }: { text: string, action: () => void, overrideStyle?: CSSProperties }) => {
    const { t } = useTranslation();

    return (
        <div className={classes.bigWhiteButton} onClick={action} dir={t('globalDir')} style={overrideStyle}>
            <h1>{text}</h1>
        </div>
    );
};

export default BigWhiteButton;