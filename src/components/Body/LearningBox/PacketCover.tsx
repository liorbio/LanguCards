import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classes from './PacketCover.module.css';

const PacketCover = ({ language }: { language: string }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const navigateToPacketRoute = () => {
        navigate(`/${language}?show=list`);
    };

    return (
        <div className={classes.packetCover} onClick={navigateToPacketRoute} dir={t('globalDir')}>
            <h1>{t('packet', { lang: language![0].toUpperCase()+language!.slice(1) })}</h1>
        </div>
    );
};

export default PacketCover;