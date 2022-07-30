import React, { useState } from "react";
import ReactDOM from 'react-dom';
import OptionsMenu from "./OptionsMenu";
import ModalBackgroundClicksPrevention from "../../UI/ModalBackgroundClicksPrevention";
import portalElement from "../../elements/portalElement";

const optionSymbolStyle = {
    gridColumn: 5,
    width: "100%",
    lineHeight: "0.3em",
    fontSize: "1.9em",
    paddingTop: "7px"
};

const OptionsToggler = ({ fullOptionsMenu }: { fullOptionsMenu: boolean }) => {
    const [opened, setOpened] = useState(false);

    const togglerClickHandler = () => {
        setOpened(prev => !prev);
    };
        
    return (
        <React.Fragment>
        <div style={optionSymbolStyle} onClick={togglerClickHandler}>
            .<br />
            .<br />
            .
        </div>
        {opened && ReactDOM.createPortal(<OptionsMenu full={fullOptionsMenu} toggleMenu={togglerClickHandler} />, portalElement)}
        {opened && ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={togglerClickHandler} />, portalElement)}
        </React.Fragment>
    );
};

export default OptionsToggler;