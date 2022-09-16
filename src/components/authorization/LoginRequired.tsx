import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

const LoginRequired = ({ children }: { children: ReactNode }) => {
    const loggedIn = useAppSelector(state => !!state.auth.jwt);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            setTimeout(() => {
                navigate("/");
            }, 500);
        }
    }, [navigate, loggedIn]);
    
    return (
        <>
            {loggedIn ? children : <p>Resource available only when logged in</p>}
        </>
    )
};

export default LoginRequired;