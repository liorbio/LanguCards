import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
    

    const handleRegister = () => {
        if (!emailInput.toLowerCase().match(/^[a-zA-Z]+(\d|.|\w)*@[a-zA-Z]+.[a-zA-Z]+.*[a-zA-Z]+$/) || passwordInput.length < 6 || passwordInput !== repasswordInput || !agreeWithTOS) {
            setWrongDetailsModal(true);
            return;
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: emailInput.toLowerCase(), password: passwordInput })
        }).then((res) => {
            toggleModal();
            showRegisterComplete();
            navigate('/learning-box');
        }).catch((err) => console.log(`Error handling register: ${err}`));
    }

    return (
        <>
            <DefaultModal title={t('register')} topRightX={true} buttonOne="REGISTER" handler={handleRegister} toggler={toggleModal} modalType="Dialogue" overrideButtonStyle={buttonStyle} overrideModalStyle={modalStyle} >
                <div className={classes.modalContent}>
                    <input type="text" placeholder="Email" value={emailInput} onChange={handleWriteEmail}/>
                    <input type="password" placeholder="Password" value={passwordInput} onChange={handleWritePassword}/>
                    <input type="password" placeholder="Re-enter password" value={repasswordInput} onChange={handleWriteRepassword}/>
                    <div>
                        <input type="checkbox" value="agreeWithTOS" id="agreewithtos" defaultChecked={agreeWithTOS} onChange={() => setAgreeWithTOS(prev => !prev)} />
                        <label htmlFor="agreewithtos">I have read and agree with the <u>terms of service of this application</u></label>
                    </div>
                </div>
            </DefaultModal>
            {wrongDetailsModal && <MessageModal text="Please fill form correctly and check you agree with terms of service" toggler={()=>setWrongDetailsModal(false)} overrideStyle={{ zIndex: 15 }}/>}
        </>
    )
};

export default RegisterModal;