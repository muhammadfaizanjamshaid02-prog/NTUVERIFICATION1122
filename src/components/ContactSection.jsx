import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="page-title">
        <i className="fa-solid fa-address-book"></i> Contact Us
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="contact-card">
            <h6>
              <i
                className="fa-solid fa-building-columns me-2"
                style={{ color: 'var(--brand-blue)' }}
              ></i>
              Controller of Examinations Office
            </h6>
            <p className="text-muted small">
              Admissions &amp; Examinations Office,
              <br />
              National Textile University, Faisalabad‑37610, Pakistan
            </p>
            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-phone"></i>
                <span>+92‑41‑9230081‑90 &nbsp;Ext: 125, 127</span>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:coe@ntu.edu.pk">coe@ntu.edu.pk</a>
              </li>
              <li>
                <i className="fa-solid fa-clock"></i>
                <span>Mon–Fri, 9:00 AM – 4:00 PM (PKT)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="contact-card">
            <h6>
              <i
                className="fa-solid fa-paper-plane me-2"
                style={{ color: 'var(--brand-blue)' }}
              ></i>
              Send a Message
            </h6>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Demo build — message send nahi hoga. coe@ntu.edu.pk par email karein.');
              }}
            >
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>
              <textarea
                className="form-control form-control-sm mt-2"
                rows="3"
                placeholder="Your message…"
                required
              ></textarea>
              <button type="submit" className="btn btn-verify btn-sm mt-2">
                <i className="fa-solid fa-paper-plane me-1"></i>Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
