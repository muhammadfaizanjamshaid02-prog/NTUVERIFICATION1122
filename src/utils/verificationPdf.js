import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ntuShieldLogo } from '../assets/ntuShieldLogo.js';

// ---------------------------------------------------------------------------
// Professional, office-standard PDF documents for the Downloads section.
// Each PDF carries the NTU letterhead, a centered title, the random sample
// record in a shaded table in the middle of the page, a verification stamp
// and the official disclaimer footer.
// ---------------------------------------------------------------------------

const RED = [139, 30, 45]; // NTU brand red (#8b1e2d)
const DARK = [45, 45, 45];
const GRAY = [110, 110, 110];
const LIGHT = [245, 240, 240];

const RECORD_ROWS = (r) => [
  ['Name', r.name],
  ["Father's Name", r.fatherName],
  ['Registration No', r.regNo],
  ['CNIC', r.cnic],
  ['Program', r.program],
  ['Specialization', r.specialization],
  ['Session', r.session],
  ['CGPA', r.cgpa],
  ['Completion Date', r.completionDate],
  ['Transcript No', r.transcriptNo],
  ['Degree No', r.degreeNo],
];

function fileSlug(name) {
  return name.trim().replace(/\s+/g, '-');
}

export function pdfFileName(record, docSlug) {
  return `${fileSlug(record.name)}-${record.regNo}-${docSlug}.pdf`;
}

function addLetterhead(doc) {
  const W = doc.internal.pageSize.getWidth();
  // thin page border
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.8);
  doc.rect(8, 8, W - 16, doc.internal.pageSize.getHeight() - 16);
  // logo
  doc.addImage(ntuShieldLogo, 'PNG', 14, 13, 20, 16.3);
  // university name
  doc.setTextColor(...RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text('NATIONAL TEXTILE UNIVERSITY', 39, 20);
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Document Verification Portal  •  Faisalabad, Pakistan', 39, 26.5);
  // red rule
  doc.setDrawColor(...RED);
  doc.setLineWidth(1.1);
  doc.line(14, 32, W - 14, 32);
  return 40; // y cursor after header
}

function addTitle(doc, y, title, subtitle) {
  const W = doc.internal.pageSize.getWidth();
  doc.setTextColor(...RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title, W / 2, y, { align: 'center' });
  doc.setTextColor(...GRAY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(subtitle, W / 2, y + 7, { align: 'center' });
  return y + 14;
}

function addRecordTable(doc, y, record, caption) {
  const W = doc.internal.pageSize.getWidth();
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(caption, 14, y);
  autoTable(doc, {
    startY: y + 4,
    head: [['Field', 'Details']],
    body: RECORD_ROWS(record),
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: RED, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 9.5, textColor: DARK },
    alternateRowStyles: { fillColor: LIGHT },
    columnStyles: { 0: { cellWidth: 52, fontStyle: 'bold' } },
  });
  return doc.lastAutoTable.finalY + 8;
}

function addVerifiedStamp(doc, y, record) {
  const W = doc.internal.pageSize.getWidth();
  // green stamp box
  doc.setFillColor(27, 122, 61);
  doc.roundedRect(W / 2 - 32, y, 64, 13, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('VERIFIED', W / 2, y + 8.5, { align: 'center' });
  doc.setTextColor(...GRAY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const stamp = record.verifiedOn || new Date().toLocaleString('en-GB');
  doc.text(`Verified on: ${stamp}`, W / 2, y + 20, { align: 'center' });
  return y + 26;
}

function addFooter(doc) {
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setTextColor(...GRAY);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.text(
      'Disclaimer: This is a computer-generated document. Any alteration or tampering renders it invalid. ' +
        'Final verification status is subject to confirmation from official university records.',
      W / 2,
      H - 19,
      { align: 'center', maxWidth: W - 30 }
    );
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`Secured & Verified by MIS, NTU   •   Page ${i} of ${pages}`, W / 2, H - 12, {
      align: 'center',
    });
  }
}

function newDoc() {
  return new jsPDF({ unit: 'mm', format: 'a4' });
}

// ---- 1. Degree Verification Request Form ----------------------------------
export function buildRequestFormPdf(record) {
  const doc = newDoc();
  let y = addLetterhead(doc);
  y = addTitle(doc, y, 'Degree Verification Request Form', 'For manual / in-person verification requests');
  y = addRecordTable(doc, y, record, 'Sample Verified Record (for reference)');
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Applicant Details (to be filled by the applicant)', 14, y);
  y += 6;
  const fields = [
    "Applicant Name",
    "Father's Name",
    'Registration No',
    'CNIC',
    'Program / Degree',
    'Session',
    'Contact No',
    'Email',
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  fields.forEach((f) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }
    doc.setTextColor(...DARK);
    doc.text(f + ':', 14, y);
    doc.setDrawColor(...GRAY);
    doc.setLineWidth(0.3);
    doc.line(62, y + 1.5, 196, y + 1.5);
    y += 10;
  });
  doc.setTextColor(...DARK);
  doc.text('Document Type:   [  ] Degree        [  ] Transcript', 14, y);
  y += 10;
  doc.text('Purpose of verification:', 14, y);
  doc.line(62, y + 1.5, 196, y + 1.5);
  y += 14;
  doc.text('Date: ______________', 14, y);
  doc.text('Signature: ______________________', 110, y);
  addFooter(doc);
  return doc;
}

// ---- 2. Verification Fee Challan ------------------------------------------
export function buildFeeChallanPdf(record) {
  const doc = newDoc();
  const W = doc.internal.pageSize.getWidth();
  let y = addLetterhead(doc);
  y = addTitle(doc, y, 'Verification Fee Challan', 'Bank challan for the document verification fee');
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const challanNo = 'CH-' + Math.floor(100000 + Math.random() * 900000);
  doc.text(`Challan No: ${challanNo}`, 14, y);
  doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, W - 14, y, { align: 'right' });
  y += 4;
  doc.text('Bank: ________________________________        Branch: ________________________________', 14, y);
  y += 10;
  y = addRecordTable(doc, y, record, 'Depositor (sample record)');
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Fee Schedule', 14, y);
  autoTable(doc, {
    startY: y + 4,
    head: [['Particulars', 'Amount (PKR)']],
    body: [
      ['Degree verification fee', '2,000'],
      ['Transcript verification fee', '1,500'],
      ['Urgent processing (optional)', '1,000'],
    ],
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: RED, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10, textColor: DARK },
    alternateRowStyles: { fillColor: LIGHT },
    columnStyles: { 1: { halign: 'right', cellWidth: 45 } },
  });
  y = doc.lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(
    'Note: Confirm the current fee schedule with the Examinations Office before depositing: +92-41-9230081-90 (Ext: 125, 127).',
    14,
    y,
    { maxWidth: W - 28 }
  );
  y += 18;
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Depositor Signature: ______________________', 14, y);
  doc.text('Bank Stamp: ______________________', 110, y);
  addFooter(doc);
  return doc;
}

// ---- 3. Verification Policy & Guidelines -----------------------------------
export function buildPolicyPdf(record) {
  const doc = newDoc();
  const W = doc.internal.pageSize.getWidth();
  let y = addLetterhead(doc);
  y = addTitle(doc, y, 'Verification Policy & Guidelines', 'Issuance and verification of academic documents');
  const sections = [
    ['1. Scope', 'These guidelines cover the verification of degrees, transcripts and other academic documents issued by National Textile University, Faisalabad.'],
    ['2. Who Can Apply', 'Graduates, employers, embassies and HEC/recognized bodies may request verification of NTU-issued documents.'],
    ['3. Required Information', "Registration number exactly as printed on the document, the Degree No / Transcript No (serial number on the document), and the document type (Degree or Transcript)."],
  ];
  sections.forEach(([h, p]) => {
    doc.setTextColor(...RED);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(h, 14, y);
    y += 6;
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(p, W - 28);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 5;
  });
  y = addRecordTable(doc, y, record, 'Example: a successfully verified record');
  y = addVerifiedStamp(doc, y, record);
  doc.setTextColor(...RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('4. Contact', 14, y);
  y += 6;
  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Controller of Examinations Office, National Textile University, Faisalabad-37610, Pakistan.', 14, y);
  y += 6;
  doc.text('Phone: +92-41-9230081-90 (Ext: 125, 127)   |   Email: coe@ntu.edu.pk', 14, y);
  addFooter(doc);
  return doc;
}
