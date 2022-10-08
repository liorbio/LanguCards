import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../backend-variables/address";

const registerPromise = async (emailInput: string, passwordInput: string) => {
    return fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email: emailInput.toLowerCase(), password: passwordInput })
    });
}

export const useRegister = (toggleModal: () => void, showRegisterComplete: () => void) => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [repasswordInput, setRepasswordInput] = useState("");
    const [agreeWithTOS, setAgreeWithTOS] = useState(false);
    const [wrongDetailsModal, setWrongDetailsModal] = useState(false);
    const navigate = useNavigate();

    const handleWriteEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
    };
    const handleWritePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    };
    const handleWriteRepassword = (event: ChangeEvent<HTMLInputElement>) => {
        setRepasswordInput(event.target.value);
    };
    const toggleAgreeWithTOS = () => {
        setAgreeWithTOS(prev => !prev);
    }
    
    const executeRegister = () => {
        if (!emailInput.toLowerCase().match(/^[a-zA-Z]+(\d|.|\w)*@[a-zA-Z]+.[a-zA-Z]+.*[a-zA-Z]+$/) || passwordInput.length < 6 || passwordInput !== repasswordInput || !agreeWithTOS) {
            setWrongDetailsModal(true);
            return;
        }
        registerPromise(emailInput, passwordInput)
            .then((res) => {
                toggleModal();
                showRegisterComplete();
                navigate('/learning-box');
            }).catch((err) => console.log(`Error handling register: ${err}`));
    }

    return {
        emailInput, handleWriteEmail,
        passwordInput, handleWritePassword,
        repasswordInput, handleWriteRepassword,
        agreeWithTOS, toggleAgreeWithTOS,
        wrongDetailsModal, setWrongDetailsModal,
        executeRegister
    };
};