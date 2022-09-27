import classes from './TextSwitchingToggleButton.module.css';

const deselectedStyle = {
    border: "3px solid #999",
    backgroundColor: "white",
    color: "#999"
}

type TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, selected, handler }: { textOne: string; textTwo: string; showTextOneState: boolean; selected: boolean; handler: () => void }) => JSX.Element | null;

const TextSwitchingToggleButtonWithDeselect: TextSwitchingToggleButtonDeclaration = ({ textOne, textTwo, showTextOneState, selected, handler }) => {
    return (
        <div onClick={handler} style={selected ? {} : deselectedStyle} className={`${classes.button} ${classes.deselectable}`}>
            {showTextOneState ? textOne : textTwo}
        </div>
    );
};

export default TextSwitchingToggleButtonWithDeselect;