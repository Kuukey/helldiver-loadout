import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Loadout from './pages/Loadout';
import './App.css'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/loadout" element={<Loadout />} />
        </Routes>
        </main>
      <Footer />
    </Router>
  );
}

export default App;





