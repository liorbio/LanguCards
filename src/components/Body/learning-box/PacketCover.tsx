import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BigWhiteButton from "../../UI/BigWhiteButton";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { packetActions } from "../../../store/redux-logic";

const PacketCover = ({ language, packetId, writingDir, className }: { language: string, packetId: string, writingDir: "ltr" | "rtl", className?: string }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const navigateToPacketRoute = () => {
        dispatch(packetActions.setPacketDetails({ packetId: packetId, writingDir: writingDir }))
        navigate(`/${language}?show=list`);
    };

    return (
        <BigWhiteButton additionalClasses={className} action={navigateToPacketRoute} text={t('packet', { lang: language![0].toUpperCase()+language!.slice(1) })} />
    );
};

export default PacketCover;