import React, { useState } from 'react';
import { DEMO_QR_SAMPLE } from '../data/records.js';

export default function QrModal({ show, onClose, onScan }) {
  const [scanning, setScanning] = useState(false);

  if (!show) return null;

  const simulateScan = () => {
    setScanning(true);
    // Pretend the camera decoded a QR printed on a degree.
    setTimeout(() => {
      setScanning(false);
      onScan(DEMO_QR_SAMPLE);
      onClose();
    }, 1400);
  };

  return (
    <div className="dvp-modal-overlay" onClick={onClose}>
      <div className="dvp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dvp-modal-header">
          <h5>
            <i className="fa-solid fa-qrcode me-2"></i>Verify via QR Code
          </h5>
          <button className="dvp-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="dvp-modal-body text-center">
          <div className="qr-frame">
            {scanning ? (
              <>
                <div className="qr-scanline"></div>
                <i className="fa-solid fa-qrcode qr-icon scanning"></i>
                <p className="mt-2 text-muted small">Scanning…</p>
              </>
            ) : (
              <>
                <i className="fa-solid fa-qrcode qr-icon"></i>
                <p className="text-muted small mt-2 mb-0">
                  Point your camera at the QR code printed on your degree or
                  transcript.
                </p>
              </>
            )}
          </div>
          <button
            className="btn btn-verify w-100 mt-3"
            onClick={simulateScan}
            disabled={scanning}
          >
            <i className="fa-solid fa-camera me-1"></i>
            {scanning ? 'Scanning…' : 'Simulate Camera Scan (Demo)'}
          </button>
          <p className="text-muted small mt-2 mb-0">
            Demo mode fills the form with a sample record. On the live portal
            this uses your phone's camera to read the printed QR code.
          </p>
        </div>
      </div>
    </div>
  );
}
