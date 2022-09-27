import React, { SetStateAction } from 'react';
import classes from './TextSwitchingToggleButton.module.css';

type TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, setShowTextOneState }: { textOne: string; textTwo: string; showTextOneState: boolean; setShowTextOneState: React.Dispatch<SetStateAction<boolean>> }) => JSX.Element | null;

const TextSwitchingToggleButton: TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, setShowTextOneState }) => {
    const toggler = () => {
        setShowTextOneState(prev => !prev);
    }

    return (
        <div onClick={toggler} className={classes.button}>
            {showTextOneState ? textOne : textTwo}
        </div>
    );
};

export default TextSwitchingToggleButton;