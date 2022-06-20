import { useState, useRef } from "react";
import DefaultModal from "../../../UI/DefaultModal";
import TextSwitchingToggleButton from "../../../UI/TextSwitchingToggleButton";
import { PacketInterface } from "./LearningBox";
import classes from './NewPacketModal.module.css';

const NewPacketModal = ({ handler, toggler }: { handler: (packet: PacketInterface) => void, toggler: () => void }) => {
    
    const [showLeftToRight, setShowLeftToRight] = useState(true);
    const languageInput = useRef<HTMLInputElement>(null);

    const handlerForCreateButton = () => {
        if (languageInput.current) {
            const newPacket: PacketInterface = { language: languageInput.current.value.toLowerCase(), direction: showLeftToRight ? "ltr" : "rtl" }
            handler(newPacket);

            // return modal inputs to their default value:
            languageInput.current.value = "";
            setShowLeftToRight(true);
        }
    }
    
    return (
        <DefaultModal title="New Packet" buttonOne="CANCEL" buttonTwo="CREATE" handler={handlerForCreateButton} toggler={toggler}>
            <div className={classes.modalBody}>
                <input type="text" placeholder="Language name" ref={languageInput} />
                <p style={{ display: "flex" }}>Writing direction: </p><TextSwitchingToggleButton textOne="left-to-right" textTwo="right-to-left" showTextOneState={showLeftToRight} setShowTextOneState={setShowLeftToRight} />
            </div>
        </DefaultModal>
    )
};

export default NewPacketModal;