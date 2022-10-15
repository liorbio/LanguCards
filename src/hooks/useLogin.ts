import { ChangeEvent, useState } from "react";
import { backendUrl } from "../backend-variables/address";
import { authActions, settingsActions } from "../store/redux-logic";
import { useAppDispatch } from "./reduxHooks";

const loginPromise = async (emailInput: string, passwordInput: string, rememberMe: boolean) => {
    return fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email: emailInput.toLowerCase(), password: passwordInput, rememberMe: rememberMe })
    });
}

export const useLogin = (toggleModal: () => void) => {
    const dispatch = useAppDispatch();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [inputsInsufficient, setInputsInsufficient] = useState(true);
    const [showWrongCredentialsModal, setShowWrongCredentialsModal] = useState(false);

    const handleWriteEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
        if (event.target.value.toLowerCase().match(/^[a-zA-Z]+(\d|.|\w)*@[a-zA-Z]+.[a-zA-Z]+.*[a-zA-Z]+$/) && passwordInput.length >= 6) {
            setInputsInsufficient(false);
        }
    };
    const handleWritePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
        if (emailInput.toLowerCase().match(/^[a-zA-Z]+(\d|.|\w)*@[a-zA-Z]+.[a-zA-Z]+.*[a-zA-Z]+$/) && event.target.value.length >= 6) {
            setInputsInsufficient(false);
        }
    };
    const toggleRememberMe = () => {
        setRememberMe(prev => !prev);
    };
    const eliminateWrongCredentialsModal = () => {
        setShowWrongCredentialsModal(false);
    };
    const executeLogin = () => {
        loginPromise(emailInput, passwordInput, rememberMe)
            .then((res) => res.json()).then((res) => {
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
                setShowWrongCredentialsModal(true);
            });
    }

    return {
        handleWriteEmail, emailInput, handleWritePassword, passwordInput, toggleRememberMe, rememberMe, showWrongCredentialsModal, inputsInsufficient, eliminateWrongCredentialsModal, executeLogin
    };
};