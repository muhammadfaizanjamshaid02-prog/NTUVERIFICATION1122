import React, { useState } from 'react';

export default function LoginModal({ show, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo-only gate: this build has no backend auth.
    setError(
      'Demo build — no real accounts here. This login would check your NTU LMS credentials on the live portal.'
    );
  };

  return (
    <div className="dvp-modal-overlay" onClick={onClose}>
      <div className="dvp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dvp-modal-header">
          <h5>
            <i className="fa-solid fa-user-shield me-2"></i>Staff Login
          </h5>
          <button className="dvp-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dvp-modal-body">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="alert alert-warning d-flex gap-2 align-items-start" role="alert">
              <i className="fa-solid fa-circle-info mt-1"></i>
              <span>{error}</span>
            </div>
          )}
          <button type="submit" className="btn btn-verify w-100">
            <i className="fa-solid fa-right-to-bracket me-1"></i> Log In
          </button>
          <p className="text-muted small mt-3 mb-0 text-center">
            Verification is public — you do not need to log in to verify a document.
          </p>
        </form>
      </div>
    </div>
  );
}
