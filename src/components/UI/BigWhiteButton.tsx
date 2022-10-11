import { useTranslation } from 'react-i18next';
import classes from './BigWhiteButton.module.css';

const BigWhiteButton = ({ text, action, additionalClasses }: { text: string, action: () => void, additionalClasses?: string }) => {
    const { t } = useTranslation();

    return (
        <div className={`${classes.bigWhiteButton} ${additionalClasses}`} onClick={action} dir={t('globalDir')}>
            <h1>{text}</h1>
        </div>
    );
};

export default BigWhiteButton;