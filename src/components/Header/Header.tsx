import { Route, Routes } from 'react-router-dom';
import classes from "./Header.module.css";
import HeaderInAddCard from './HeaderInAddCard';
import HeaderInCard from './HeaderInCard';
import HeaderInMain from './HeaderInMain';
import HeaderInPacket from './HeaderInPacket';

const Header = () => {
    return (
        <>
            <div className={classes.whiteTop}></div>
            <Routes>
                <Route path="/" element={<HeaderInMain />} />
                <Route path="/:language" element={<HeaderInPacket />} />
                <Route path="/:language/add" element={<HeaderInAddCard />} />
                <Route path="/:language/card" element={<HeaderInCard />} />
            </Routes>
        </>
    );
};

export default Header;
