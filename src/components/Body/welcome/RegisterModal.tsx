import { useTranslation } from "react-i18next";
import { useRegister } from "../../../hooks/useRegister";
import DefaultModal from "../../UI/DefaultModal";
import MessageModal from "../../UI/MessageModal";
import classes from './Welcome.module.css';

const buttonStyle = {
    backgroundColor: "#9694F8",
    fontWeight: 600
};
const modalStyle = {
    width: "95vw",
    left: "2.5vw"
};

const RegisterModal = ({ toggleModal, showRegisterComplete }: { toggleModal: () => void, showRegisterComplete: () => void }) => {
    const { t } = useTranslation();
    const {
        emailInput, handleWriteEmail,
        passwordInput, handleWritePassword,
        repasswordInput, handleWriteRepassword,
        agreeWithTOS, toggleAgreeWithTOS,
        wrongDetailsModal, setWrongDetailsModal,
        executeRegister
    } = useRegister(toggleModal, showRegisterComplete);

    return (
        <>
            <DefaultModal title={t('register')} topRightX={true} buttonOne={t('register').toUpperCase()} handler={executeRegister} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={buttonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent}>
                    <input type="text" placeholder={t('email')} value={emailInput} onChange={handleWriteEmail}/>
                    <input type="password" placeholder={t('password')} value={passwordInput} onChange={handleWritePassword}/>
                    <input type="password" placeholder={t('reenter_password')} value={repasswordInput} onChange={handleWriteRepassword}/>
                    <div>
                        <input type="checkbox" value="agreeWithTOS" id="agreewithtos" defaultChecked={agreeWithTOS} onChange={toggleAgreeWithTOS} />
                        <label htmlFor="agreewithtos">{t('read_tos1')} <u>{t('read_tos2')}</u></label>
                    </div>
                </div>
            </DefaultModal>
            {wrongDetailsModal && <MessageModal text={t('fill_correctly')} toggler={()=>setWrongDetailsModal(false)} overrideStyle={{ zIndex: 15 }}/>}
        </>
    )
};

export default RegisterModal;