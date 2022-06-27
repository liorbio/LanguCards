import ModalBackgroundClicksPrevention from "../../../../UI/ModalBackgroundClicksPrevention";
import { ThinXVector, PlusVector } from '../../../../generatedIcons';
import classes from './TagsModal.module.css';
import { MouseEventHandler, useRef } from "react";

const TagsModal = ({ handleExit, tags, removeTag, addTag }: { handleExit: () => void, tags: string[], removeTag: (tag: string) => void, addTag: (tag: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        removeTag(event.currentTarget.id);
    };
    const handleAdd = () => {
        if (inputRef.current!.value.length > 0) {
            addTag(inputRef.current!.value.toLowerCase());
        }
    };
    
    return (
        <>
            <div className={classes.modalWrapper}>
                <div className={classes.topRow}>
                    <input type="text" ref={inputRef} />
                    <div onClick={handleAdd}><PlusVector /></div>
                </div>
                <div className={classes.tagsWrapper}>
                    {tags.map(t => <div className={classes.tag} key={t} id={t} onClick={handleClick}><span>{t}</span><ThinXVector /></div>)}
                </div>
                <div className={classes.bottomRow} onClick={handleExit}>Close</div>
            </div>
            <ModalBackgroundClicksPrevention handler={handleExit} />
        </>
    )
};

export default TagsModal;