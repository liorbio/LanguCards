import ReactDOM from 'react-dom';
import { useState } from "react";
import DefaultModal from '../../../../UI/DefaultModal';
import portalElement from '../../../../elements/portalElement';
import ModalBackgroundClicksPrevention from '../../../../UI/ModalBackgroundClicksPrevention';
import classes from './DeleteCardButton.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { packetsActions } from '../../../../store/redux-logic';

const DeleteCardButton = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [showWarning, setShowWarning] = useState(false);
    const handleDelete = () => {
        //setShowWarning(false);
        dispatch(packetsActions.deleteCard({ packetLanguage: params.language as string, cardId: searchParams.get('cardid') as string }));
        navigate(-2);
    }

    const warning = (
        <DefaultModal title="Warning" buttonOne='Cancel' buttonTwo='Delete' handler={handleDelete} toggler={() =>  setShowWarning(false)}>
            <div style={{ paddingBlock: "1.5rem", textAlign: "center" }}>Are you sure you want to delete this card?</div>
        </DefaultModal>
    )

    return (
        <>
            <div className={classes.deleteButton} onClick={() => setShowWarning(true)}>Delete</div>
            {showWarning && ReactDOM.createPortal(<ModalBackgroundClicksPrevention handler={() => setShowWarning(false)} />, portalElement)}
            {showWarning && ReactDOM.createPortal(warning, portalElement)}

        </>
        
    )
};

export default DeleteCardButton;