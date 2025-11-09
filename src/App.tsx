import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PartnerBanks from './components/PartnerBanks';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Quotation from './components/Quotation';
import ChannelPartners from './components/ChannelPartners';
import ChannelPartnersMap from './components/ChannelPartnersMap';
import PartnerRegistration from './components/PartnerRegistration';
import ChatBot from './components/ChatBot';
import WhatsAppChat from './components/WhatsAppChat';
import Footer from './components/Footer';
// Partner/Admin pages removed (Firebase removed)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <Header />
            <Hero />
            <About />
            <PartnerBanks />
            <Services />
            <Calculator />
            <Quotation />
            <ChannelPartners />
            <PartnerRegistration />
            <Footer />
            <ChatBot />
            <WhatsAppChat />
          </div>
        } />
        <Route path="/partners" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <Header />
            <ChannelPartnersMap />
            <Footer />
            <ChatBot />
            <WhatsAppChat />
          </div>
        } />
  {/* Partner and Admin routes removed */}
      </Routes>
    </Router>
  );
}

export default App;
