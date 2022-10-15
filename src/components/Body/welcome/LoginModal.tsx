import { useTranslation } from "react-i18next";
import { useLogin } from "../../../hooks/useLogin";
import DefaultModal from "../../UI/DefaultModal";
import MessageModal from "../../UI/MessageModal";
import classes from './Welcome.module.css';

const grayedButtonStyle = {
    backgroundColor: "#999999",
    fontWeight: 600  
};
const activeButtonStyle = {
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
        inputsInsufficient,
        executeLogin
    } = useLogin(toggleModal);

    return (
        <>
            <DefaultModal title={t('login')} topRightX={true} buttonOne={t('enter').toUpperCase()} handler={inputsInsufficient ? () => {} : executeLogin} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={inputsInsufficient ? grayedButtonStyle : activeButtonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent} dir={t('globalDir')}>
                    <input type="text" placeholder={t('email')} onChange={handleWriteEmail} value={emailInput} />
                    <input type="password" placeholder={t('password')} onChange={handleWritePassword} value={passwordInput} />
                    <div>
                        <input type="checkbox" id="rememberme" defaultChecked={rememberMe} onChange={toggleRememberMe} />
                        <label htmlFor="rememberme">{t('remember_me')}</label>
                    </div>
                    <p>{t('no_user_yet')}</p>
                    <p style={{ color: "#0029FF" }} onClick={switchToRegister}>{t('create_a_user')}</p>
                </div>
            </DefaultModal>
            {showWrongCredentialsModal && <MessageModal text={t('wrong_credentials')} toggler={eliminateWrongCredentialsModal} overrideStyle={{ zIndex: 15 }}/>}
        </>
    );
};

export default LoginModal;