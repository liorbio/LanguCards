import { useTranslation } from 'react-i18next';
import ModalBackgroundClicksPrevention from "../../../../UI/ModalBackgroundClicksPrevention";
import { ThinXVector } from '../../../../generatedIcons';
import classes from './TagsModal.module.css';
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

const TagsModal = ({ handleExit, tags, removeTag, addTag }: { handleExit: () => void, tags: string[], removeTag: (tag: string) => void, addTag: (tag: string) => void }) => {
    const { t } = useTranslation();
    const [typedTag, setTypedTag] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleCreatedTagXClick: MouseEventHandler<HTMLDivElement> = (event) => {
        removeTag(event.currentTarget.id);
    };
    const handleTypedTagXClick = () => {
        setTypedTag("");
    };
    const typeCharacters = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypedTag(event.target.value);
    }
    const detectEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 13) {
            if (typedTag !== "") {
                addTag(typedTag.toLowerCase());
            }
            setTypedTag("");
        }
    }
    const addTagBeforeUnmount = () => {
        if (typedTag !== "") {
            addTag(typedTag.toLowerCase());
        }
        setTypedTag("");
    }
    const refocusInput = () => {
        inputRef.current?.focus();
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, [inputRef]);
    
    return (
        <>
            <div dir={t('globalDir')} className={classes.modalWrapper} onClick={refocusInput}>
                <div className={classes.tagsWrapper}>
                    {tags.map(tg => <div className={classes.tag} key={tg} id={tg} onClick={handleCreatedTagXClick}><span>{tg}</span><ThinXVector /></div>)}
                    {typedTag !== "" && <div className={classes.tag} onClick={handleTypedTagXClick}><span>{typedTag}</span><ThinXVector /></div>}
                </div>
                <input type="text" value={typedTag} ref={inputRef} onChange={typeCharacters} onKeyUp={detectEnterPress} onBlur={addTagBeforeUnmount} />
                <div className={classes.bottomRow} onClick={handleExit}>{t('close')}</div>
            </div>
            <ModalBackgroundClicksPrevention handler={handleExit} />
        </>
    )
};

export default TagsModal;