import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { authActions } from "../../store/redux-logic";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authActions.clearJwt());
        navigate('/');
    }, [navigate, dispatch]);
    return (
        <>
        </>
    )
};

export default Logout;