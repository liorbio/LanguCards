import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { authActions, settingsActions } from "../../store/redux-logic";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authActions.clearJwt());
        dispatch(settingsActions.clearSeenTutorialFromIDBUponLogout());
        navigate('/');
    }, [navigate, dispatch]);
    return (
        <>
        </>
    )
};

export default Logout;