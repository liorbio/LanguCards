import { ReactElement } from "react";
import classes from "./Header.module.css";
import Logo from "./Logo";

type HeaderComponentDeclaration = ({ location }: { location: string }) => ReactElement | null;

const Header: HeaderComponentDeclaration = ({ location }) => {
    // different return according to location (as of now, only 2 locations):

    const headerMain = (
        <nav className={classes.navbar}>
            <Logo />
            {/* OptionsToggler */}
        </nav>
    );
    const headerInPacket = (
        <nav className={classes.navbar}>
            {/* Return (UI component that receives the Where-to prop) */}
            <Logo />
            {/* SearchToggler */}
            {/* OptionsToggler */}
        </nav>
    );
    
    return (
        <>
            {location === "/" && headerMain}
            {location === "/packet" && headerInPacket}
        </>
    );
};

export default Header;
