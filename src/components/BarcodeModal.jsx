import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

// ---------------------------------------------------------------------------
// Real barcode reader: uses the device camera (via html5-qrcode) to read
// 1D barcodes (CODE-128, CODE-39, EAN, UPC …) printed on degrees/transcripts.
// Falls back to manual entry when no camera is available (e.g. desktop).
// ---------------------------------------------------------------------------

const FORMATS = [
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.ITF,
  Html5QrcodeSupportedFormats.CODABAR,
  Html5QrcodeSupportedFormats.QR_CODE,
];

export default function BarcodeModal({ show, onClose, onScan }) {
  const [error, setError] = useState('');
  const [manual, setManual] = useState('');
  const scannerRef = useRef(null);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!show) return;
    setError('');
    setManual('');
    let cancelled = false;

    const finish = async (scanner, text) => {
      cancelled = true;
      try {
        await scanner.stop();
      } catch {
        /* not running — ignore */
      }
      try {
        await scanner.clear();
      } catch {
        /* ignore */
      }
      scannerRef.current = null;
      onScanRef.current(text);
      onCloseRef.current();
    };

    const t = setTimeout(async () => {
      let scanner;
      try {
        scanner = new Html5Qrcode('barcode-reader-region');
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 260, height: 140 }, formatsToSupport: FORMATS },
          (decodedText) => {
            if (!cancelled) finish(scanner, decodedText);
          },
          () => {
            /* per-frame decode miss — ignore */
          }
        );
      } catch (e) {
        if (!cancelled) {
          setError(
            'Camera start nahi ho saka (' +
              (e && e.message ? e.message : 'permission denied') +
              '). Neeche barcode number haath se likh kar try karein.'
          );
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(t);
      const s = scannerRef.current;
      scannerRef.current = null;
      if (s) {
        s.stop()
          .then(() => s.clear())
          .catch(() => {});
      }
    };
  }, [show]);

  if (!show) return null;

  const useManual = () => {
    if (!manual.trim()) return;
    onScan(manual.trim());
    onClose();
  };

  return (
    <div className="dvp-modal-overlay" onClick={onClose}>
      <div className="dvp-modal dvp-modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="dvp-modal-header">
          <h5>
            <i className="fa-solid fa-qrcode me-2"></i>Verify via QR / Barcode
          </h5>
          <button className="dvp-modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="dvp-modal-body text-center">
          <div id="barcode-reader-region" className="barcode-region"></div>

          {error && (
            <div className="alert alert-warning py-2 mt-2 text-start" role="alert">
              <i className="fa-solid fa-triangle-exclamation me-1"></i>
              {error}
            </div>
          )}

          <p className="text-muted small mt-2 mb-2">
            Camera ko degree / transcript par chhape QR code ya barcode par
            rakhein — code parhte hi Google mein khulega aur form bhi fill ho
            jayega.
          </p>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ya barcode number yahan likhein, e.g. T007763"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') useManual();
              }}
            />
            <button className="btn btn-verify" type="button" onClick={useManual}>
              <i className="fa-solid fa-check me-1"></i>Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
