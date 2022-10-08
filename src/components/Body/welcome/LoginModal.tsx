import { useTranslation } from "react-i18next";
import { useLogin } from "../../../hooks/useLogin";
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
}

const LoginModal = ({ toggleModal, switchToRegister }: { toggleModal: () => void, switchToRegister: () => void }) => {
    const { t } = useTranslation();
    const {
        emailInput, handleWriteEmail,
        passwordInput, handleWritePassword,
        rememberMe, toggleRememberMe,
        showWrongCredentialsModal, eliminateWrongCredentialsModal,
        executeLogin
    } = useLogin(toggleModal);

    return (
        <>
            <DefaultModal title={t('login')} topRightX={true} buttonOne="ENTER" handler={executeLogin} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={buttonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent}>
                    <input type="text" placeholder="Email" onChange={handleWriteEmail} value={emailInput} />
                    <input type="password" placeholder="Password" onChange={handleWritePassword} value={passwordInput} />
                    <div>
                        <input type="checkbox" id="rememberme" defaultChecked={rememberMe} onChange={toggleRememberMe} />
                        <label htmlFor="rememberme">Remember me on this device</label>
                    </div>
                    <p>Don't have a user yet?</p>
                    <p style={{ color: "#0029FF" }} onClick={switchToRegister}>Create a user!</p>
                </div>
            </DefaultModal>
            {showWrongCredentialsModal && <MessageModal text="Wrong email or password!" toggler={eliminateWrongCredentialsModal} overrideStyle={{ zIndex: 15 }}/>}
        </>
    );
};

export default LoginModal;