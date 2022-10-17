import classes from './FloatingButton.module.css';

const FloatingButton = ({ action, active, children }: { action: () => void, active: boolean, children: React.ReactNode }) => {
    return (
        <div className={classes.button+" "+(active ? classes.active : classes.inactive)} onClick={active ? action : () => {}}>
            {children}
        </div>
    )

}

export default FloatingButton;