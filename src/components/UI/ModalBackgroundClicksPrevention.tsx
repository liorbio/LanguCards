import classes from './ModalBackgroundClicksPrevention.module.css';

const ModalBackgroundClicksPrevention = ({ handler }: { handler: () => void }) => {
    return (
        <div onClick={handler} className={classes.prevention}>
        </div>
    )
};

export default ModalBackgroundClicksPrevention;