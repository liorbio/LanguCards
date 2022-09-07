import { useTranslation } from 'react-i18next';
import classes from './BigWhiteButton.module.css';

const BigWhiteButton = ({ text, action }: { text: string, action: () => void }) => {
    const { t } = useTranslation();

    return (
        <div className={classes.bigWhiteButton} onClick={action} dir={t('globalDir')}>
            <h1>{text}</h1>
        </div>
    );
};

export default BigWhiteButton;