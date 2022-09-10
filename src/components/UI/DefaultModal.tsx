import ReactDOM from 'react-dom';
import { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
//import XIcon from '../../icons/XIcon.png';
import XIcon from '../../generatedIcons/XVector';
import classes from './DefaultModal.module.css';
import portalElement from '../../elements/portalElement';
import ModalBackgroundClicksPrevention from './ModalBackgroundClicksPrevention';

type DefaultModalDeclaration = ({ children, title, topRightX, buttonOne, buttonTwo, handler, toggler, overrideModalStyle, overrideButtonStyle, modalType }: { children: ReactNode, title: string, topRightX?: boolean, buttonOne: string, buttonTwo?: string, handler: () => void, toggler: () => void, overrideModalStyle?: CSSProperties, overrideButtonStyle?: CSSProperties, modalType: "Warning" | "Dialogue" }) => JSX.Element | null;

// This is a default modal where, if we have two bottom buttons,
// the left one is to exit (toggle)
// the right one is the execute whatever function



const DefaultModal: DefaultModalDeclaration = ({ children, title, topRightX, buttonOne, buttonTwo, handler, toggler, overrideModalStyle, overrideButtonStyle, modalType }) => {
    const { t } = useTranslation();

    const borderSide = t('globalDir') === 'ltr' ? { borderRight: "1px solid #c9c9c9" } : { borderLeft: "1px solid #c9c9c9" };
    const borderIfTwoButtons = buttonTwo ? borderSide : {};

    const modalWindow = <div className={classes.modal} dir={t('globalDir')} style={overrideModalStyle}>
                            <div className={`${classes.top} ${classes[`top${modalType}`]}`}>
                                 <h1>{title}</h1>
                                {topRightX && <div onClick={toggler}><XIcon /></div>}
                            </div>
                            {children}
                            <div className={buttonTwo ? classes.twoButtonBottom : classes.oneButtonBottom}>
                                <div onClick={buttonTwo ? toggler : handler} style={{ ...borderIfTwoButtons, ...overrideButtonStyle }}>{buttonOne}</div>
                                {buttonTwo && <div onClick={handler} style={overrideButtonStyle}>{buttonTwo}</div>}
                            </div>
                        </div>;

    return (
        <>
            {ReactDOM.createPortal(modalWindow, portalElement)}
            {ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={toggler} />, portalElement)}
        </>
    )
};

export default DefaultModal;