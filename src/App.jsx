import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import VerifySection from './components/VerifySection.jsx';
import HowToGuide from './components/HowToGuide.jsx';
import Downloads from './components/Downloads.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  const navigate = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="top">
      <Navbar
        onLogin={() => setLoginOpen(true)}
        onNavigate={(t) => navigate(t)}
      />

      <main className="container main-wrapper">
        <VerifySection onContact={() => navigate('contact')} />
        <HowToGuide />
        <Downloads />
        <ContactSection />
      </main>

      <Footer />

      <LoginModal show={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
