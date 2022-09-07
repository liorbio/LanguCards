import { useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { PacketType } from "../../../types/types";
import DefaultModal from "../../UI/DefaultModal";
import TextSwitchingToggleButton from "../../UI/TextSwitchingToggleButton";
import classes from './LearningBox.module.css';

const NewPacketModal = ({ handler, toggler }: { handler: (packet: PacketType) => void, toggler: () => void }) => {
    const { t } = useTranslation();
    const [showLeftToRight, setShowLeftToRight] = useState(true);
    const languageInput = useRef<HTMLInputElement>(null);

    const handlerForCreateButton = () => {
        if (languageInput.current) {
            const newPacket: PacketType = { language: languageInput.current.value.toLowerCase(), dir: showLeftToRight ? "ltr" : "rtl", cards: [] };
            handler(newPacket);

            // return modal inputs to their default value:
            languageInput.current.value = "";
            setShowLeftToRight(true);
        }
    }
    
    return (
        <DefaultModal title={t('new_packet')} buttonOne={t('cancel')} buttonTwo={t('create')} handler={handlerForCreateButton} toggler={toggler} modalType="Dialogue">
            <div className={classes.modalBody}>
                <input type="text" placeholder={t('language_name')} ref={languageInput} />
                <p style={{ display: "flex" }}>{t('writing_direction')} </p><TextSwitchingToggleButton textOne={t("left_to_right")} textTwo={t("right_to_left")} showTextOneState={showLeftToRight} setShowTextOneState={setShowLeftToRight} />
            </div>
        </DefaultModal>
    )
};

export default NewPacketModal;