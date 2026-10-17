import React, { useState, useEffect, useRef } from 'react';
import { verifyDocument, DEMO_RECORDS } from '../data/records.js';
import ResultCard from './ResultCard.jsx';
import NotFoundCard from './NotFoundCard.jsx';
import InlineScanner from './InlineScanner.jsx';

const IDLE = 'idle';
const LOADING = 'loading';
const SUCCESS = 'success';
const NOT_FOUND = 'not-found';

// ---------------------------------------------------------------------------
// Showcase mode: the portal opens with Ahmad Raza's record already verified
// and the verification form locked (not editable).
// ---------------------------------------------------------------------------
const SHOWCASE_RECORD = {
  regNo: '22-NTU-TT-1034',
  docType: 'degree',
  docNo: 'T009871',
};
const FORM_LOCKED = true;

export default function VerifySection({ onContact }) {
  const [regNo, setRegNo] = useState(SHOWCASE_RECORD.regNo);
  const [docType, setDocType] = useState(SHOWCASE_RECORD.docType);
  const [docNo, setDocNo] = useState(SHOWCASE_RECORD.docNo);
  const [status, setStatus] = useState(IDLE);
  const [record, setRecord] = useState(null);
  const [error, setError] = useState('');
  const [barcodeOpen, setBarcodeOpen] = useState(false);

  // Auto-verify the showcase record as soon as the page loads.
  useEffect(() => {
    setStatus(LOADING);
    const t = setTimeout(() => {
      const found = verifyDocument(SHOWCASE_RECORD);
      if (found) {
        setRecord(found);
        setStatus(SUCCESS);
      } else {
        setStatus(NOT_FOUND);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const docLabel = docType === 'degree' ? 'Degree No' : 'Transcript No';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regNo.trim() || !docNo.trim()) {
      setError('Please fill in Registration Number and ' + docLabel + '.');
      return;
    }
    setError('');
    setStatus(LOADING);
    setRecord(null);

    // Simulate the server round-trip of the real portal.
    setTimeout(() => {
      const found = verifyDocument({ regNo, docType, docNo });
      if (found) {
        setRecord(found);
        setStatus(SUCCESS);
      } else {
        setStatus(NOT_FOUND);
      }
    }, 1500);
  };

  const handleQrScan = (payload) => {
    setRegNo(payload.regNo);
    setDocType(payload.docType);
    setDocNo(payload.docNo);
    setError('');
    setStatus(LOADING);
    setTimeout(() => {
      const found = verifyDocument(payload);
      if (found) {
        setRecord(found);
        setStatus(SUCCESS);
      } else {
        setStatus(NOT_FOUND);
      }
    }, 1200);
  };

  const resetForm = () => {
    setStatus(IDLE);
    setRecord(null);
    setError('');
  };

  // Pre-opened result tab (created on the QR button tap, i.e. a real user
  // gesture) so popup blockers don't stop the scanned link from opening.
  const pendingTabRef = useRef(null);

  const openScanner = () => {
    try {
      pendingTabRef.current = window.open('about:blank', '_blank');
    } catch {
      pendingTabRef.current = null;
    }
    setBarcodeOpen(true);
  };

  const closeScanner = () => {
    setBarcodeOpen(false);
    const t = pendingTabRef.current;
    pendingTabRef.current = null;
    try {
      if (t && !t.closed) t.close();
    } catch {
      /* ignore */
    }
  };

  const openScanTarget = (raw) => {
    const isUrl = /^https?:\/\//i.test(raw);
    const target = isUrl
      ? raw
      : 'https://www.google.com/search?q=' + encodeURIComponent(raw);
    const t = pendingTabRef.current;
    pendingTabRef.current = null;
    try {
      if (t && !t.closed) {
        t.location.href = target;
        return;
      }
    } catch {
      /* fall through to window.open */
    }
    try {
      window.open(target, '_blank', 'noopener,noreferrer');
    } catch {
      /* popup blocked — verification still continues */
    }
  };

  // Barcode/QR scan: if the code matches a known Degree/Transcript serial,
  // fill the whole form and verify; otherwise just drop it into the
  // document-number field. The scanned code is also opened (site or Google).
  const handleBarcodeScan = (text) => {
    const raw = (text || '').trim();
    const code = raw.toUpperCase();
    setBarcodeOpen(false);
    if (!code) {
      const t = pendingTabRef.current;
      pendingTabRef.current = null;
      try {
        if (t && !t.closed) t.close();
      } catch {
        /* ignore */
      }
      return;
    }
    // If the scanned QR holds a website link, open that site directly;
    // otherwise open the scanned code in Google (new tab).
    openScanTarget(raw);
    const hit = DEMO_RECORDS.find(
      (r) => r.degreeNo.toUpperCase() === code || r.transcriptNo.toUpperCase() === code
    );
    if (hit) {
      const isDegree = hit.degreeNo.toUpperCase() === code;
      handleQrScan({
        regNo: hit.regNo,
        docType: isDegree ? 'degree' : 'transcript',
        docNo: code,
      });
    } else {
      setDocNo(text.trim());
      setError('');
    }
  };

  return (
    <section id="verify" className="verify-section">
      <div className="page-title">
        <i className="fa-solid fa-shield-halved"></i> Document Verification
        &nbsp;—&nbsp; تصدیق دستاویز
      </div>

      <div className="main-card">
        <div className="row g-0">
          {/* ---------------- LEFT: FORM ---------------- */}
          <div className="col-lg-5 col-md-6 form-section">
            <div className="section-heading">
              <i
                className="fa-solid fa-file-circle-check"
                style={{ color: 'var(--brand-blue)' }}
              ></i>{' '}
              Verification Form
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">
                  <i className="fa-solid fa-id-card me-1 text-secondary"></i>
                  Registration Number <span className="text-danger">*</span>
                </label>
                <div className="input-icon-wrap">
                  <i className="fa fa-icon fa-hashtag"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2019-CS-01"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    disabled={FORM_LOCKED}
                    readOnly={FORM_LOCKED}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="fa-solid fa-layer-group me-1 text-secondary"></i>
                  Document Type <span className="text-danger">*</span>
                </label>
                <div className="input-icon-wrap">
                  <i className="fa fa-icon fa-list-ul"></i>
                  <select
                    className="form-select"
                    value={docType}
                    onChange={(e) => {
                      setDocType(e.target.value);
                      setDocNo('');
                    }}
                    disabled={FORM_LOCKED}
                  >
                    <option value="degree">Degree</option>
                    <option value="transcript">Transcript</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  <i className="fa-solid fa-barcode me-1 text-secondary"></i>
                  {docLabel} <span className="text-danger">*</span>
                </label>
                <div className="input-icon-wrap">
                  <i className="fa fa-icon fa-fingerprint"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter number"
                    value={docNo}
                    onChange={(e) => setDocNo(e.target.value)}
                    disabled={FORM_LOCKED}
                    readOnly={FORM_LOCKED}
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-1"></i>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-verify w-100"
                disabled={status === LOADING || FORM_LOCKED}
              >
                <i className="fa-solid fa-magnifying-glass me-1"></i>
                {status === LOADING ? 'Verifying…' : 'Verify Now'}
              </button>

              <button
                type="button"
                className="btn btn-qr w-100 mt-2"
                onClick={() => (barcodeOpen ? closeScanner() : openScanner())}
              >
                <i className="fa-solid fa-qrcode me-1"></i> Verify via QR Code
              </button>

              {barcodeOpen && (
                <InlineScanner
                  onScan={handleBarcodeScan}
                  onClose={closeScanner}
                />
              )}

              {status !== IDLE && !FORM_LOCKED && (
                <button
                  type="button"
                  className="btn btn-link btn-sm mt-2 w-100 text-decoration-none"
                  onClick={resetForm}
                >
                  <i className="fa-solid fa-rotate-left me-1"></i>New verification
                </button>
              )}
            </form>

          </div>

          {/* ---------------- RIGHT: RESULT ---------------- */}
          <div className="col-lg-7 col-md-6 result-section">
            {status === IDLE && (
              <div className="result-placeholder">
                <i className="fa-solid fa-file-shield placeholder-icon"></i>
                <h6>Your verification result appears here</h6>
                <p className="text-muted small mb-0">
                  Enter your registration number and document number, then press
                  “Verify Now”. The system queries the university database and
                  displays your verified information — name, father's name,
                  CNIC, degree, CGPA and completion date.
                </p>
              </div>
            )}

            {status === LOADING && (
              <div className="loader-wrap">
                <div className="loader-spinner"></div>
                <p>
                  <i
                    className="fa-solid fa-satellite-dish me-1"
                    style={{ color: 'var(--brand-blue)' }}
                  ></i>
                  Verifying document, please wait…
                </p>
                <p className="loader-urdu">تصدیق جاری ہے، براہ کرم انتظار کریں…</p>
              </div>
            )}

            {status === SUCCESS && record && <ResultCard record={record} />}

            {status === NOT_FOUND && <NotFoundCard onContact={onContact} />}
          </div>
        </div>
      </div>

      {/* Controller of Examinations Office card — right below the verification card, on every screen size */}
      <div className="exam-office-card">
        <div className="exam-office-header">
          <i className="fa-solid fa-building-columns me-2"></i>
          Controller of Examinations Office
        </div>
        <div className="exam-office-body">
          <div className="exam-office-row">
            <i className="fa-solid fa-location-dot text-danger"></i>
            <span>
              Admissions &amp; Examinations Office, National Textile
              University, Faisalabad-37610, Pakistan
            </span>
          </div>
          <div className="exam-office-row">
            <i className="fa-solid fa-phone text-success"></i>
            <span>
              +92-41-9230081-90 <span className="text-muted">Ext: 125,127</span>
            </span>
          </div>
          <div className="exam-office-row">
            <i className="fa-solid fa-envelope text-primary"></i>
            <a href="mailto:coe@ntu.edu.pk">coe@ntu.edu.pk</a>
          </div>
        </div>
      </div>

    </section>
  );
}
