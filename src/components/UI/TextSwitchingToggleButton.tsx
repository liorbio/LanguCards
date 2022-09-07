import React, { SetStateAction } from 'react';

const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "30px",
    padding: "10px",
    width: "7em",
    alignSelf: "center",
    fontWeight: "bold"
}

type TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, setShowTextOneState }: { textOne: string; textTwo: string; showTextOneState: boolean; setShowTextOneState: React.Dispatch<SetStateAction<boolean>> }) => JSX.Element | null;

const TextSwitchingToggleButton: TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, setShowTextOneState }) => {
    const toggler = () => {
        setShowTextOneState(prev => !prev);
    }

    return (
        <div onClick={toggler} style={buttonStyle}>
            {showTextOneState ? textOne : textTwo}
        </div>
    );
};

export default TextSwitchingToggleButton;