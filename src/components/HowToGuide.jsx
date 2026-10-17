import React from 'react';

const STEPS = [
  {
    n: 1,
    title: 'Enter Registration Number',
    en: 'Type your student registration number exactly as printed on your documents (e.g. 2019-CS-01).',
    ur: 'اپنا رجسٹریشن نمبر بالکل ویسے لکھیں جیسا دستاویز پر چھپا ہو۔',
  },
  {
    n: 2,
    title: 'Select Document Type',
    en: 'Choose the type of document you wish to verify: Degree — for verifying your degree certificate. Transcript — for verifying your official academic transcript.',
    ur: 'دستاویز کی قسم منتخب کریں: ڈگری یا ٹرانسکرپٹ۔',
  },
  {
    n: 3,
    title: 'Enter Document Number',
    en: 'Enter the Degree No or Transcript No as printed on your physical document. This is a unique serial number issued by the university.',
    ur: 'ڈگری یا ٹرانسکرپٹ پر درج منفرد سیریل نمبر لکھیں۔',
  },
  {
    n: 4,
    title: 'Click "Verify Now"',
    en: 'The system will query the database and display your verified information including name, father\'s name, CNIC, degree, CGPA, and completion date.',
    ur: '«Verify Now» بٹن دبائیں۔ نظام آپ کی معلومات ڈیٹابیس سے تصدیق کر کے دکھائے گا۔',
  },
];

const ISSUES = [
  {
    en: 'Make sure there are no extra spaces before or after the registration or document number.',
    ur: 'رجسٹریشن یا دستاویز نمبر کے آگے پیچھے کوئی خالی جگہ نہ ہو۔',
  },
  {
    en: 'If QR scan does not work, switch to manual entry and type the number from the document.',
    ur: 'اگر QR اسکین کام نہ کرے تو دستی طریقہ استعمال کریں اور نمبر خود لکھیں۔',
  },
  {
    en: 'Ensure you have a stable internet connection for verification to complete successfully.',
    ur: 'تصدیق کے لیے مستحکم انٹرنیٹ کنکشن یقینی بنائیں۔',
  },
];

export default function HowToGuide() {
  return (
    <section id="guide" className="guide-section">
      <div className="page-title">
        <i className="fa-solid fa-circle-question"></i> How to Verify Your Document
        &nbsp;—&nbsp; اپنی دستاویز کی تصدیق کیسے کریں
      </div>

      <div className="row g-4">
        {STEPS.map((s) => (
          <div className="col-md-6" key={s.n}>
            <div className="step-card">
              <div className="step-number">{s.n}</div>
              <div>
                <h6>{s.title}</h6>
                <p className="mb-1">{s.en}</p>
                <p className="urdu-text mb-0">{s.ur}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-6">
          <div className="step-card qr-step">
            <div className="step-number">5</div>
            <div>
              <h6>
                QR Code Verification{' '}
                <span className="badge bg-info text-dark ms-1">Mobile Only</span>
              </h6>
              <p className="mb-1">
                On a mobile device, tap “Verify via QR Code” and point your
                camera at the QR code printed on your degree or transcript.
                The system will automatically scan and verify — no manual
                number entry required.
              </p>
              <p className="urdu-text mb-2">
                موبائل پر «Verify via QR Code» دبائیں اور کیمرہ ڈگری/ٹرانسکرپٹ
                کے QR کوڈ پر رکھیں۔ کوئی نمبر درج کرنے کی ضرورت نہیں۔
              </p>
              <p className="mb-0 small text-muted">
                <strong>Note:</strong> The QR scan button is visible{' '}
                <u>only on mobile screens</u>. On desktop, please use manual
                entry. Ensure you allow camera access when prompted by your
                browser.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="step-card issues-card">
            <div className="step-number alt">!</div>
            <div>
              <h6>Common Issues</h6>
              {ISSUES.map((it, i) => (
                <div className="issue-item" key={i}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <div>
                    <p className="mb-0">{it.en}</p>
                    <p className="urdu-text mb-0">{it.ur}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
