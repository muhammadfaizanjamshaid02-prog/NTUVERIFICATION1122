import React from 'react';

export default function Footer() {
  return (
    <footer className="dvp-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <i className="fa-solid fa-shield-halved me-2"></i>
            <strong>Secured &amp; Verified by MIS, NTU</strong>
          </div>
          <div>
            <i className="fa-solid fa-code me-2"></i>
            Developed &amp; Maintained by MIS Department
          </div>
        </div>

        <div className="footer-contact">
          <span>
            <i className="fa-solid fa-location-dot me-1"></i>Admissions &amp;
            Examinations Office, National Textile University, Faisalabad‑37610,
            Pakistan
          </span>
          <span>
            <i className="fa-solid fa-phone me-1"></i>+92‑41‑9230081‑90 Ext: 125,127
          </span>
          <span>
            <i className="fa-solid fa-envelope me-1"></i>coe@ntu.edu.pk
          </span>
        </div>

        <div className="footer-bottom">
          <span>Copyright © 2025. All Rights Reserved. National Textile University.</span>
          <span>Developed By MIS Team</span>
        </div>
      </div>
    </footer>
  );
}
