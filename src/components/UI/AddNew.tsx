import classes from "./AddNew.module.css";

const AddNew = ({ handler }: { handler: () => void }) => {
    return (
        <div className={classes.addNew} onClick={handler}>
            +
        </div>
    );
};

export default AddNew;