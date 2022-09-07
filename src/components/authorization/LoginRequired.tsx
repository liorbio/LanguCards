import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";

const LoginRequired = ({ children }: { children: ReactNode }) => {
    const loggedIn = useAppSelector(state => !!state.auth.jwt);
    
    return (
        <>
            {loggedIn ? children : <p>Resource available only when logged in</p>}
        </>
    )
};

export default LoginRequired;