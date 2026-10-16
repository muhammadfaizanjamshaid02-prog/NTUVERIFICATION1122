import React from 'react';

const FIELDS = [
  ['Degree', 'degreeType'],
  ['Program', 'program'],
  ['Specialization', 'specialization'],
  ['Session', 'session'],
  ['CGPA', 'cgpa'],
  ['Completion Date', 'completionDate'],
  ['Transcript No', 'transcriptNo'],
  ['Degree No', 'degreeNo'],
];

export default function ResultCard({ record }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <div className="result-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div>
          <h5 className="mb-0">Verification Successful</h5>
          <small>Document authenticity confirmed</small>
        </div>
        <span className="ms-auto result-stamp">{record.verifiedOn}</span>
      </div>

      <div className="result-identity">
        <div className="avatar-circle">
          <i className="fa-solid fa-user-graduate"></i>
        </div>
        <div>
          <h4 className="mb-1">{record.name}</h4>
          <div className="text-muted small">S/O {record.fatherName}</div>
          <div className="text-muted small">
            <i className="fa-solid fa-id-card me-1"></i>CNIC: {record.cnic}
          </div>
          <div className="mt-1">
            <span className="badge bg-success-subtle text-success border border-success-subtle">
              <i className="fa-solid fa-shield-halved me-1"></i>
              {record.regNo}
            </span>
          </div>
        </div>
      </div>

      <div className="result-grid">
        {FIELDS.map(([label, key]) => (
          <div className="result-row" key={key}>
            <span className="result-label">{label}</span>
            <span className="result-value">{record[key]}</span>
          </div>
        ))}
      </div>

      <div className="result-disclaimer">
        <strong>Disclaimer:</strong> This is a computer-generated verification. Any
        alteration or tampering renders this verification invalid. Errors and
        omissions are excepted. Final verification status is subject to
        confirmation from official university records.
      </div>
    </div>
  );
}
