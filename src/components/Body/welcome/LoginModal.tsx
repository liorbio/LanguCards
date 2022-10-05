import { t } from "i18next";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { backendUrl } from "../../../backend-variables/address";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { authActions, settingsActions } from "../../../store/redux-logic";
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
    const [wrongCredentials, setWrongCredentials] = useState(false);


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

        fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: emailInput.toLowerCase(), password: passwordInput, rememberMe: rememberMe })
        }).then((res) => res.json()).then((res) => {
            dispatch(authActions.setJwtUponLogin({ jwt: res.authToken, jwtExpiryDate: res.expiryDate }));
            if (res.seenTutorial) dispatch(settingsActions.seeTutorial());
            if (res.expiryDate) {
                setTimeout(() => {
                    dispatch(authActions.clearJwt());
                }, res.expiryDate - new Date().getTime())
            }
            toggleModal();
        }).catch((err) => {
            console.log(`Error handling login: ${err}`);
            setWrongCredentials(true);
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
            {wrongCredentials && <MessageModal text="Wrong email or password!" toggler={()=>setWrongCredentials(false)} overrideStyle={{ zIndex: 15 }}/>}
        </>
    );
};

export default LoginModal;