import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { PacketType } from "../../../types/types";
import DefaultModal from "../../UI/DefaultModal";
import TextSwitchingToggleButton from "../../UI/TextSwitchingToggleButton";
import classes from './LearningBox.module.css';

const EditPacketModal = ({ language, writingDir, updatingFunction, toggler }: { language: string, writingDir: "ltr" | "rtl", updatingFunction: ({ language, writingDir }: { language?: string, writingDir?: "ltr" | "rtl" }) => void, toggler: () => void }) => {
    const { t } = useTranslation();
    const [showLeftToRight, setShowLeftToRight] = useState(writingDir === "ltr");
    const [languageName, setLanguageName] = useState(language);

    const handleEdit = () => {
        if (languageName.length > 0) {
            const packetDetails: PacketType = { language: languageName.toLowerCase(), writingDir: showLeftToRight ? "ltr" : "rtl" };
            updatingFunction(packetDetails);
        }
    }
    
    return (
        <DefaultModal title={t('edit_packet')} buttonOne={t('cancel')} buttonTwo={t('confirm')} handler={handleEdit} toggler={toggler} modalType="Dialogue">
            <div className={classes.modalBody}>
                <input type="text" placeholder={t('language_name')} value={languageName} onChange={(event) => setLanguageName(event.target.value)} />
                <p style={{ display: "flex" }}>{t('writing_direction')} </p><TextSwitchingToggleButton textOne={t("left_to_right")} textTwo={t("right_to_left")} showTextOneState={showLeftToRight} setShowTextOneState={setShowLeftToRight} />
            </div>
        </DefaultModal>
    )
};

export default EditPacketModal;