import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BigWhiteButton from "../../UI/BigWhiteButton";

const PacketCover = ({ language }: { language: string }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const navigateToPacketRoute = () => {
        navigate(`/${language}?show=list`);
    };

    return (
        <BigWhiteButton action={navigateToPacketRoute} text={t('packet', { lang: language![0].toUpperCase()+language!.slice(1) })} />
    );
};

export default PacketCover;