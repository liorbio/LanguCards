import { Route, Routes } from 'react-router-dom';
import HeaderInAddCard from './HeaderInAddCard';
import HeaderInCard from './HeaderInCard';
import HeaderInMain from './HeaderInMain';
import HeaderInPacket from './HeaderInPacket';
import HeaderInSettings from './HeaderInSettings';

const Header = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderInMain />} />
                <Route path="/learning-box" element={<HeaderInMain />} />
                <Route path="/:language" element={<HeaderInPacket />} />
                <Route path="/:language/add" element={<HeaderInAddCard />} />
                <Route path="/:language/card" element={<HeaderInCard />} />
                <Route path="/:language/card/edit" element={<HeaderInAddCard />} />
                <Route path="/settings" element={<HeaderInSettings />} />
            </Routes>
        </>
    );
};

export default Header;
