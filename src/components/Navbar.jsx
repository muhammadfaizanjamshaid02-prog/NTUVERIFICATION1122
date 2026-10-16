import React from 'react';

export default function Navbar({ onLogin, onNavigate }) {
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
            <img src="/images/ntu-logo.png" alt="NTU logo" className="dvp-logo-img" />
            <span className="logo-span">DEGREE VERIFICATION</span>
            <span className="logo-span-blue">&nbsp;PORTAL</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dvpNav"
            aria-controls="dvpNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </button>

          <div className="collapse navbar-collapse" id="dvpNav">
            <ul className="navbar-nav ms-auto dvp-nav-links">
              <li className="nav-item">
                <button className="nav-link nav-link-custom" onClick={onLogin}>
                  <i className="fa-solid fa-right-to-bracket"></i>&nbsp;LOG IN
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={() => onNavigate('verify')}
                >
                  <i className="fa-solid fa-right-to-bracket"></i>&nbsp;Transcript / Degree Verification
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={() => onNavigate('downloads')}
                >
                  <i className="fas fa-download"></i>&nbsp;DOWNLOADS
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom"
                  onClick={() => onNavigate('contact')}
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
