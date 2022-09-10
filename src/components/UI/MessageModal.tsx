import ReactDOM from 'react-dom';
import portalElement from '../../elements/portalElement';
import ModalBackgroundClicksPrevention from './ModalBackgroundClicksPrevention';
import classes from './MessageModal.module.css';
import { CSSProperties } from 'react';

const ModalWindow = ({ text, overrideStyle }: { text: string, overrideStyle?: CSSProperties }) => {
    return (
        <div className={classes.messageModal} style={overrideStyle}>
            {text}
        </div>
    );
};

const MessageModal = ({ text, toggler, overrideStyle }: { text: string, toggler: () => void, overrideStyle?: CSSProperties }) => {
    return (
        <>
            {ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={toggler} overrideStyle={overrideStyle} />, portalElement)}
            {ReactDOM.createPortal(<ModalWindow text={text} overrideStyle={overrideStyle} />, portalElement)}
        </>
    );
};

export default MessageModal;