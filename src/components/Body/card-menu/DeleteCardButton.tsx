import ReactDOM from 'react-dom';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import DefaultModal from '../../UI/DefaultModal';
import portalElement from '../../../elements/portalElement';
import ModalBackgroundClicksPrevention from '../../UI/ModalBackgroundClicksPrevention';
import classes from './DeleteCardButton.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { packetsActions } from '../../../store/redux-logic';

const DeleteCardButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [showWarning, setShowWarning] = useState(false);
    const handleDelete = () => {
        dispatch(packetsActions.deleteCard({ packetLanguage: params.language as string, cardId: searchParams.get('cardid') as string }));
        navigate(-2);
    }

    const warning = (
        <DefaultModal title={t('warning')} buttonOne={t('cancel')} buttonTwo={t('delete')} handler={handleDelete} toggler={() =>  setShowWarning(false)} modalType="Warning">
            <div style={{ paddingBlock: "1.5rem", textAlign: "center" }}>{t('are_you_sure_delete')}</div>
        </DefaultModal>
    )

    return (
        <>
            <div className={classes.deleteButton} onClick={() => setShowWarning(true)}>{t('delete')}</div>
            {showWarning && warning}
        </>
        
    )
};

export default DeleteCardButton;