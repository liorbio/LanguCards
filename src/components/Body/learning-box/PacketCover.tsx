import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BigWhiteButton from "../../UI/BigWhiteButton";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { packetActions } from "../../../store/redux-logic";
import EditPacketModal from "./EditPacketModal";
import { useState } from "react";

const PacketCover = ({ language, packetId, writingDir, className, handleUpdatePacketDetails }: { language: string, packetId: string, writingDir: "ltr" | "rtl", className?: string, handleUpdatePacketDetails: ({ language, writingDir }: { language?: string, writingDir?: "ltr" | "rtl" }) => void }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showEditModal, setShowEditModal] = useState(false);
    
    const navigateToPacketRoute = () => {
        dispatch(packetActions.setPacketDetails({ packetId: packetId, writingDir: writingDir }))
        navigate(`/packet/${language}?show=list`);
    };
    const updatingFunction = ({ language, writingDir }: { language?: string, writingDir?: "ltr" | "rtl" }) => {
        setShowEditModal(false);
        handleUpdatePacketDetails({ language, writingDir });
    }

    return (
        <>
            <BigWhiteButton additionalClasses={className} action={navigateToPacketRoute} text={t('packet', { lang: language![0].toUpperCase()+language!.slice(1) })} longPressAction={() => setShowEditModal(true)} />
            {showEditModal && <EditPacketModal language={language} writingDir={writingDir} updatingFunction={updatingFunction} toggler={() => setShowEditModal(false)} />}
        </>
    );
};

export default PacketCover;