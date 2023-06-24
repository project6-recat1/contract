import React from 'react';
import './App.css';

import Dashboard from './components/dashboard';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import YouTubeVideo from './components/landing/YouTubeVideo';
import Services from './components/Services';
import SingleService from './components/SingleService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    // <div>
    //   {/* <Dashboard/> */}
    //   <Header />
    //   <YouTubeVideo />
      
    //   <Footer />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/details/:id" element={<SingleService />} />
      </Routes>
    </Router>
  );
}

export default App;
