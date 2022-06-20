import { CSSProperties, ReactNode } from 'react';
import XIcon from '../icons/XIcon.png';
import classes from './DefaultModal.module.css';

type DefaultModalDeclaration = ({ children, title, topRightX, buttonOne, buttonTwo, handler, toggler, overrideStyle }: { children: ReactNode, title: string, topRightX?: boolean, buttonOne: string, buttonTwo?: string, handler: () => void, toggler: () => void, overrideStyle?: CSSProperties }) => JSX.Element | null;

// This is a default modal where, if we have two bottom buttons,
// the left one is to exit (toggle)
// the right one is the execute whatever function

const DefaultModal: DefaultModalDeclaration = ({ children, title, topRightX, buttonOne, buttonTwo, handler, toggler, overrideStyle }) => {
    return (
        <div className={classes.modal} style={overrideStyle}>
            <div className={classes.top}>
                <h1>{title}</h1>
                {topRightX && <img src={XIcon} alt="exit" onClick={toggler} />}
            </div>
            {children}
            <div className={buttonTwo ? classes.twoButtonBottom : classes.oneButtonBottom}>
                <div onClick={buttonTwo ? toggler : handler} style={{ borderRight: "1px solid #c9c9c9" }}>{buttonOne}</div>
                {buttonTwo && <div onClick={handler}>{buttonTwo}</div>}
            </div>
        </div>
    )
};

export default DefaultModal;