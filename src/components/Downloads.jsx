import React from 'react';

const FILES = [
  {
    icon: 'fa-file-lines',
    title: 'Degree Verification Request Form',
    desc: 'Printable form for manual / in-person verification requests.',
    meta: 'PDF · 210 KB',
  },
  {
    icon: 'fa-money-check-dollar',
    title: 'Verification Fee Challan',
    desc: 'Bank challan format for the document verification fee.',
    meta: 'PDF · 145 KB',
  },
  {
    icon: 'fa-book-open',
    title: 'Verification Policy & Guidelines',
    desc: 'Official policy for issuance and verification of documents.',
    meta: 'PDF · 320 KB',
  },
];

export default function Downloads() {
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
                  onClick={() =>
                    alert('Demo build — yeh file yahan attach nahi ki gayi.')
                  }
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
