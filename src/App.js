import React from 'react';
import './App.css';
import LandingPage from './components/landing/landingpage';
import Dashboard from './components/dashboard';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import Services from './components/services';
import YouTubeVideo from './components/landing/YouTubeVideo';
function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <LandingPage />
      {/* <Header />
      <YouTubeVideo />
      <Services />
      <Footer /> */}
    </div>
  );
}

export default App;
