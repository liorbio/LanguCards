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
            <DefaultModal title={t('register')} topRightX={true} buttonOne="REGISTER" handler={executeRegister} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={buttonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent}>
                    <input type="text" placeholder="Email" value={emailInput} onChange={handleWriteEmail}/>
                    <input type="password" placeholder="Password" value={passwordInput} onChange={handleWritePassword}/>
                    <input type="password" placeholder="Re-enter password" value={repasswordInput} onChange={handleWriteRepassword}/>
                    <div>
                        <input type="checkbox" value="agreeWithTOS" id="agreewithtos" defaultChecked={agreeWithTOS} onChange={toggleAgreeWithTOS} />
                        <label htmlFor="agreewithtos">I have read and agree with the <u>terms of service of this application</u></label>
                    </div>
                </div>
            </DefaultModal>
            {wrongDetailsModal && <MessageModal text="Please fill form correctly and check you agree with terms of service" toggler={()=>setWrongDetailsModal(false)} overrideStyle={{ zIndex: 15 }}/>}
        </>
    )
};

export default RegisterModal;