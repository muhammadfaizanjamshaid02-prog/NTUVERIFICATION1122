import React, { useState } from 'react';
import { ntuShieldLogo } from '../assets/ntuShieldLogo.js';

export default function Navbar({ onLogin, onNavigate }) {
  // React-driven mobile menu (Bootstrap JS is not loaded, so data-bs-toggle
  // would do nothing).
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (fn) => () => {
    setMenuOpen(false);
    fn();
  };

  return (
    <nav className="dvp-navbar sticky-top">
      <div className="container">
        <div className="navbar navbar-expand-lg p-0">
          <a
            className="navbar-brand dvp-brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('top');
            }}
          >
            <img src={ntuShieldLogo} alt="NTU logo" className="dvp-logo-img" />
            <span className="logo-span">DEGREE VERIFICATION</span>
            <span className="logo-span-blue">&nbsp;PORTAL</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-controls="dvpNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-white`}></i>
          </button>

          <div
            className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}
            id="dvpNav"
          >
            <ul className="navbar-nav ms-auto dvp-nav-links">
              <li className="nav-item">
                <button className="nav-link nav-link-custom" onClick={go(onLogin)}>
                  <i className="fa-solid fa-right-to-bracket"></i>&nbsp;LOG IN
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={go(() => onNavigate('verify'))}
                >
                  <i className="fa-solid fa-right-to-bracket"></i>&nbsp;Transcript / Degree Verification
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={go(() => onNavigate('downloads'))}
                >
                  <i className="fas fa-download"></i>&nbsp;DOWNLOADS
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={go(() => onNavigate('contact'))}
                >
                  <i className="fa fa-address-book"></i>&nbsp;CONTACT US
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
