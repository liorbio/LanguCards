import classes from '../Header.module.css';

const FilterButton = ({ text, selected, handler }: { text: string, selected: boolean, handler: () => void }) => {
    return (
        <div onClick={handler} className={`${classes.filterButton} ${selected && classes.selectedFilterButton}`}>{text}</div>
    )
};

export default FilterButton;