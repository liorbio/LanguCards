import React, { useState } from "react";
import ReactDOM from 'react-dom';
import OptionsMenu from "./OptionsMenu";
import ModalBackgroundClicksPrevention from "../../UI/ModalBackgroundClicksPrevention";

const optionSymbolStyle = {
    gridColumn: 5,
    width: "100%",
    lineHeight: "0.3em",
    fontSize: "1.9em",
    paddingTop: "1px"
};

// Selecting portal element as an array since querySelectorAll returns HTMLElement
// as opposed to querySelector that returns HTMLElement | null 🤬
const portalElementAsArray = document.querySelectorAll<HTMLElement>("#overlay-root");
const portalElement = portalElementAsArray[0];

const OptionsToggler = () => {
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
        {opened && ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={togglerClickHandler} />, portalElement)}
        {opened && ReactDOM.createPortal(<OptionsMenu />, portalElement)}
        </React.Fragment>
    );
};

export default OptionsToggler;