import React from 'react';

import './App.css';

import Dashboard from './components/dashboard';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import YouTubeVideo from './components/landing/YouTubeVideo';
function App() {
  return (
    <div>
      <Dashboard/>
      {/* <Header />
      <YouTubeVideo />
      <Footer /> */}
    </div>
  );
}

export default App;
