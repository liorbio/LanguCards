import { useState } from "react";
import { useTranslation } from 'react-i18next';
import DefaultModal from '../../UI/DefaultModal';
import classes from './DeleteCardButton.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';

const DeleteCardButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const packetId = useAppSelector(state => state.packet.packetId);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [showWarning, setShowWarning] = useState(false);
    const handleDelete = () => {
        fetch(`/packets/${packetId}/${searchParams.get('cardid')}`, {
            method: 'DELETE',
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => {
                console.log(`Card deletion successful`);
                navigate(-2);
            })
            .catch((err) => console.log(`Error deleting card: ${err}`));
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