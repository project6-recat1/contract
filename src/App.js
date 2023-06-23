import React from 'react';
import './App.css';
import Services from './components/Services';
import SingleService from './components/SingleService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/details/:id" element={<SingleService />} />
      </Routes>
    </Router>
  );
}

export default App;
