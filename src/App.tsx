import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LearningBox from './components/body/learning-box/LearningBox';
import AddCard from './components/body/card-menu/AddCard';
import LanguCard from './components/body/packet/LanguCard';
import Packet from './components/body/packet/Packet';
import Settings from './components/body/settings/Settings';
import Header from './components/header/Header';
import { useAppDispatch } from './hooks/reduxHooks';
import { settingsActions } from './store/redux-logic';
import { get } from 'idb-keyval';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Welcome from './components/body/welcome/Welcome';
import LoginRequired from './components/authorization/LoginRequired';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    get('seenTutorial').then(val => {
      dispatch(settingsActions.updateSettingsFromIdb({ seenTutorial: val }));    
    });
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/:language" element={<LoginRequired><Packet /></LoginRequired>} />
        <Route path="/:language/add" element={<LoginRequired><AddCard /></LoginRequired>} />
        <Route path="/:language/card" element={<LoginRequired><LanguCard /></LoginRequired>} />
        <Route path="/:language/card/edit" element={<LoginRequired><AddCard editMode={true} /></LoginRequired>} />
        <Route path="/settings" element={<LoginRequired><Settings /></LoginRequired>} />
        <Route path="/learning-box" element={<LoginRequired><LearningBox /></LoginRequired>} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
    </Suspense>
  );
}

export default App;
