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
  const scannerRef = useRef(null);
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
      } catch (e) {
        if (!cancelled) {
          setError(
            'Camera start nahi ho saka (' +
              (e && e.message ? e.message : 'permission denied') +
              '). Browser se camera ki ijazat dein aur dobara try karein.'
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
      <div id="barcode-reader-region" className="barcode-region"></div>
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
