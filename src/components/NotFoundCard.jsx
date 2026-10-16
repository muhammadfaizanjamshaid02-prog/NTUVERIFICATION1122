import React from 'react';

const CHECKS = [
  <>Ensure the <strong>Registration Number</strong> is correct and matches your documents exactly.</>,
  <>Verify the <strong>Degree No</strong> or <strong>Transcript No</strong> as printed on the physical document.</>,
  <>Make sure there are no extra spaces or missing characters.</>,
];

export default function NotFoundCard({ onContact }) {
  return (
    <div className="notfound-card">
      <div className="notfound-header">
        <div className="nf-icon">
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
        <div className="nf-text">
          <h6>Record Not Found</h6>
          <small>No matching document in the system</small>
        </div>
      </div>

      <div className="notfound-body">
        <p>
          The requested record does not exist in our database. Please verify the
          details entered and try again.
        </p>
        <div className="notfound-checks">
          {CHECKS.map((check, i) => (
            <div className="notfound-check" key={i}>
              <i className="fa-solid fa-circle-dot"></i>
              <span>{check}</span>
            </div>
          ))}
        </div>

        <div className="alumni-box">
          <i className="fa-solid fa-user-graduate"></i>
          <div>
            <strong>Are you an Alumni?</strong> If you have recently graduated or
            your record is not found, please contact the{' '}
            <strong>Examination Department</strong> directly for manual
            verification and further assistance.
            <div className="mt-2">
              <span className="me-3">
                <i className="fa-solid fa-phone me-1"></i>+92-41-9230081-90 Ext: 125,127
              </span>
              <span>
                <i className="fa-solid fa-envelope me-1"></i>coe@ntu.edu.pk
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-outline-primary btn-sm" onClick={onContact}>
            <i className="fa-solid fa-headset me-1"></i>Need Help? Contact Examination Department
          </button>
        </div>
      </div>
    </div>
  );
}
