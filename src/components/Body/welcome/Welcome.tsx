import BigWhiteButton from '../../UI/BigWhiteButton';
import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <div className={classes.welcome}>
            <BigWhiteButton action={()=>{}} text="Log In" />
            <BigWhiteButton action={()=>{}} text="Register" />
        </div>
    )
};

export default Welcome;