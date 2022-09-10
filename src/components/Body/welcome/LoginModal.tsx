import { t } from "i18next";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { authActions } from "../../../store/redux-logic";
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
    const dispatch = useAppDispatch();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [wrongCredentialsModal, setWrongCredentialsModal] = useState(false);


    const handleWriteEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
    };
    const handleWritePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    };

    const handleLogin = () => {
        // Simple validation
        if (!emailInput.toLowerCase().match(/^[a-zA-Z]+(\d|.|\w)*@[a-zA-Z]+.[a-zA-Z]+.*[a-zA-Z]+$/)) return;
        if (passwordInput.length < 6) return;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: emailInput.toLowerCase(), password: passwordInput })
        }).then((res) => res.json()).then((res) => {
            dispatch(authActions.setJwtUponLogin({ jwt: res.authToken, rememberMe: rememberMe }));
            toggleModal();
        }).catch((err) => {
            console.log(`Error handling login: ${err}`);
            setWrongCredentialsModal(true);
        });
    }

    return (
        <>
            <DefaultModal title={t('login')} topRightX={true} buttonOne="ENTER" handler={handleLogin} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={buttonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent}>
                    <input type="text" placeholder="Email" onChange={handleWriteEmail} value={emailInput} />
                    <input type="password" placeholder="Password" onChange={handleWritePassword} value={passwordInput} />
                    <div>
                        <input type="checkbox" id="rememberme" defaultChecked={rememberMe} onChange={() => setRememberMe(prev => !prev)} />
                        <label htmlFor="rememberme">Remember me on this device</label>
                    </div>
                    <p>Don't have a user yet?</p>
                    <p style={{ color: "#0029FF" }} onClick={switchToRegister}>Create a user!</p>
                </div>
            </DefaultModal>
            {wrongCredentialsModal && <MessageModal text="Email or password wrong!" toggler={()=>setWrongCredentialsModal(false)} overrideStyle={{ zIndex: 15 }}/>}
        </>
    );
};

export default LoginModal;