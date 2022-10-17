import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LearningBox from './components/body/learning-box/LearningBox';
import AddCard from './components/body/card-menu/AddCard';
import LanguCard from './components/body/langucard/LanguCard';
import Packet from './components/body/packet/Packet';
import Settings from './components/body/settings/Settings';
import Header from './components/header/Header';
import { useAppDispatch } from './hooks/reduxHooks';
import { authActions, settingsActions } from './store/redux-logic';
import { get } from 'idb-keyval';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Welcome from './components/body/welcome/Welcome';
import LoginRequired from './components/authorization/LoginRequired';
import Logout from './components/authorization/Logout';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // CHANGE THE seenTutorial TO WORK THROUGH DB

    // get('seenTutorial').then(val => {
    //   dispatch(settingsActions.updateSettingsFromIdb({ seenTutorial: val }));    
    // });
    let autoLogoutTimer: NodeJS.Timeout;

    Promise.all([get('languCardsJwt'), get('languCardsJwtExpiryDate'), get('languCardsSeenTutorial')]).then((values) => {
      const [jwt, jwtExpiryDate, seenTutorial] = values;

      if (seenTutorial) dispatch(settingsActions.seeTutorial());

      if (!jwtExpiryDate) dispatch(authActions.consumeJwtFromIDB({ jwt: jwt, jwtExpiryDate: null}));

      if (jwtExpiryDate) {
        if (new Date().getTime() >= jwtExpiryDate) {
          dispatch(authActions.clearJwt());
          dispatch(settingsActions.clearSeenTutorialFromIDBUponLogout());
        } else {
          dispatch(authActions.consumeJwtFromIDB({ jwt: jwt, jwtExpiryDate: jwtExpiryDate}));
          autoLogoutTimer = setTimeout(() => {
            dispatch(authActions.clearJwt());
            dispatch(settingsActions.clearSeenTutorialFromIDBUponLogout());
          }, jwtExpiryDate - new Date().getTime());
        }
      }   
    });
    return () => {
      clearTimeout(autoLogoutTimer);
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/packet/:language" element={<LoginRequired><Packet /></LoginRequired>} />
        <Route path="/packet/:language/add" element={<LoginRequired><AddCard /></LoginRequired>} />
        <Route path="/packet/:language/card" element={<LoginRequired><LanguCard /></LoginRequired>} />
        <Route path="/packet/:language/card/edit" element={<LoginRequired><AddCard editMode={true} /></LoginRequired>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/learning-box" element={<LoginRequired><LearningBox /></LoginRequired>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
    </Suspense>
  );
}

export default App;
