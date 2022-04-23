import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

function App() {
  const loc = useLocation();
  
  return (
    <div className="App">
      <Header location={loc.pathname} />
      <Routes>
        <Route path="/packet" element={<div></div>} />
        <Route path="/" element={<div></div>} />
      </Routes>
    </div>
  );
}

export default App;
