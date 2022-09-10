import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BigWhiteButton from '../../UI/BigWhiteButton';
import LoginModal from './LoginModal';
import classes from './Welcome.module.css';
import RegisterModal from './RegisterModal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import MessageModal from '../../UI/MessageModal';

const Welcome = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const loggedIn = useAppSelector(state => !!state.auth.jwt);
    
    useEffect(() => {
        if (loggedIn) navigate('learning-box');
    }, [loggedIn, navigate]);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showRegisterComplete, setShowRegisterComplete] = useState(false);

    const switchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    }

    return (
        <div className={classes.welcome}>
            <section dir={t('globalDir')} style={{ textAlign: t('globalDir')==='ltr' ? "left" : "right" }}>
                {t('welcome1')}<br /><br />
                {t('welcome2')}<br />
                {t('welcome3')}<br />
                <br />
                <div><em>{t('welcome4')}</em></div>
            </section>
            <BigWhiteButton action={()=>{setShowLoginModal(true)}} text={t('login')} />
            <BigWhiteButton action={()=>{setShowRegisterModal(true)}} text={t('register')} />
            {showLoginModal && <LoginModal toggleModal={()=>{setShowLoginModal(false)}} switchToRegister={switchToRegister} />}
            {showRegisterModal && <RegisterModal toggleModal={()=>{setShowRegisterModal(false)}} showRegisterComplete={() => {setShowRegisterComplete(true)}} />}
            {showRegisterComplete && <MessageModal text="Registration successful!" toggler={() => {setShowRegisterComplete(false)}} />}
        </div>
    )
};

export default Welcome;