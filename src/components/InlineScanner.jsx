import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

// ---------------------------------------------------------------------------
// Inline barcode/QR reader — renders directly below the form buttons (like
// the official NTU portal), not in a popup. Clean UI: just the camera frame
// with corner brackets, nothing else.
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

export default function InlineScanner({ onScan, onClose }) {
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(true);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
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
          { fps: 10, qrbox: { width: 250, height: 250 }, formatsToSupport: FORMATS },
          (decodedText) => {
            if (!cancelled) finish(scanner, decodedText);
          },
          () => {
            /* per-frame decode miss — ignore */
          }
        );
        if (!cancelled) setStarting(false);
      } catch (e) {
        if (!cancelled) {
          setStarting(false);
          setError(
            'Could not start the camera (' +
              (e && e.message ? e.message : 'permission denied') +
              '). Please allow camera access in your browser and try again.'
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
  }, []);

  // Scan a QR/barcode from an uploaded image (e.g. a QR saved on this phone)
  const onFilePicked = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      const text = await scanner.scanFile(file, false);
      const s = scannerRef.current;
      scannerRef.current = null;
      if (s) {
        try {
          await s.stop();
        } catch {
          /* ignore */
        }
        try {
          await s.clear();
        } catch {
          /* ignore */
        }
      }
      onScanRef.current(text);
      onCloseRef.current();
    } catch {
      setError('Could not read a QR/barcode from that image. Try a clearer photo.');
    }
  };

  return (
    <div className="inline-scanner">
      <button
        type="button"
        className="scanner-close"
        onClick={onClose}
        aria-label="Close scanner"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <button
        type="button"
        className="scanner-upload"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        aria-label="Upload QR image"
        title="Upload QR image"
      >
        <i className="fa-solid fa-image"></i>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFilePicked}
      />
      <div id="barcode-reader-region" className="barcode-region"></div>
      {starting && !error && (
        <div className="scanner-status">Starting camera…</div>
      )}
      <div className="scan-frame" aria-hidden="true">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>
      </div>
      {error && (
        <div className="alert alert-warning py-2 mt-2 text-start" role="alert">
          <i className="fa-solid fa-triangle-exclamation me-1"></i>
          {error}
        </div>
      )}
    </div>
  );
}
