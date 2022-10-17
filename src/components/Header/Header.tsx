import { Route, Routes } from 'react-router-dom';
import HeaderInAddCard from './HeaderInAddCard';
import HeaderInCard from './HeaderInCard';
import HeaderInMain from './HeaderInMain';
import HeaderInPacket from './HeaderInPacket';
import HeaderInSettings from './HeaderInSettings';
import classes from './Header.module.css';

const Header = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderInMain />} />
                <Route path="/learning-box" element={<HeaderInMain />} />
                <Route path="/packet/:language" element={<HeaderInPacket />} />
                <Route path="/packet/:language/add" element={<HeaderInAddCard />} />
                <Route path="/packet/:language/card" element={<HeaderInCard />} />
                <Route path="/packet/:language/card/edit" element={<HeaderInAddCard />} />
                <Route path="/settings" element={<HeaderInSettings />} />
            </Routes>
            <div className={classes.contentPusher}></div>
        </>
    );
};

export default Header;
