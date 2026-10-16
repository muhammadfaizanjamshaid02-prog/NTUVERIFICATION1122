import React from 'react';
import { DEMO_RECORDS } from '../data/records.js';
import {
  buildRequestFormPdf,
  buildFeeChallanPdf,
  buildPolicyPdf,
  pdfFileName,
} from '../utils/verificationPdf.js';

// ---------------------------------------------------------------------------
// Each "Download" button generates a professional, office-standard PDF with
// the NTU letterhead. A random sample record appears in the middle of every
// document, and the file is named after that record's name.
// ---------------------------------------------------------------------------

function randomRecord() {
  return DEMO_RECORDS[Math.floor(Math.random() * DEMO_RECORDS.length)];
}

const FILES = [
  {
    icon: 'fa-file-lines',
    title: 'Degree Verification Request Form',
    desc: 'Printable form for manual / in-person verification requests.',
    meta: 'PDF · with sample record',
    docSlug: 'Verification-Request-Form',
    build: buildRequestFormPdf,
  },
  {
    icon: 'fa-money-check-dollar',
    title: 'Verification Fee Challan',
    desc: 'Bank challan format for the document verification fee.',
    meta: 'PDF · with sample record',
    docSlug: 'Verification-Fee-Challan',
    build: buildFeeChallanPdf,
  },
  {
    icon: 'fa-book-open',
    title: 'Verification Policy & Guidelines',
    desc: 'Official policy for issuance and verification of documents.',
    meta: 'PDF · with sample record',
    docSlug: 'Verification-Policy-Guidelines',
    build: buildPolicyPdf,
  },
];

export default function Downloads() {
  const handleDownload = (f) => {
    const record = randomRecord();
    const doc = f.build(record);
    doc.save(pdfFileName(record, f.docSlug));
  };

  return (
    <section id="downloads" className="downloads-section">
      <div className="page-title">
        <i className="fa-solid fa-download"></i> Downloads
      </div>
      <div className="row g-3">
        {FILES.map((f, i) => (
          <div className="col-md-4" key={i}>
            <div className="download-card">
              <div className="download-icon">
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h6>{f.title}</h6>
              <p className="text-muted small">{f.desc}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">{f.meta}</span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleDownload(f)}
                >
                  <i className="fa-solid fa-download me-1"></i>Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
