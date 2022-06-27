import { Routes, Route } from 'react-router-dom';
import './App.css';
import LearningBox from './components/Body/LearningBox/LearningBox';
import AddCard from './components/Body/Packet/AddCard/AddCard';
import Packet from './components/Body/Packet/Packet';
import Header from './components/Header/Header';


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/:language" element={<Packet />} />
        <Route path="/:language/add" element={<AddCard />} />
        <Route path="/:language/card" element={<></>} />
        <Route path="/" element={<LearningBox />} />
      </Routes>
    </div>
  );
}

export default App;
