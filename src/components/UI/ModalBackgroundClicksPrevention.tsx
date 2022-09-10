import { CSSProperties } from 'react';
import classes from './ModalBackgroundClicksPrevention.module.css';

const ModalBackgroundClicksPrevention = ({ handler, overrideStyle }: { handler: () => void, overrideStyle?: CSSProperties }) => {
    return (
        <div onClick={handler} className={classes.prevention} style={overrideStyle}>
        </div>
    )
};

export default ModalBackgroundClicksPrevention;