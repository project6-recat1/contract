import React from 'react';

import './App.css';
import LandingPage from './components/landing/landingpage';
import Dashboard from './components/dashboard';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import Services from './components/services';
import YouTubeVideo from './components/landing/YouTubeVideo';
import Services from './components/Services';
import SingleService from './components/SingleService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <div>
      <LandingPage />
     
    </div>
  );
}

export default App;
