// ---------------------------------------------------------------------------
// Demo dataset — stands in for the university's verification database.
// In the real portal this lookup hits the MIS server; here we keep a few
// sample records so the UI can be tried end-to-end.
// ---------------------------------------------------------------------------

export const DEMO_RECORDS = [
  {
    regNo: '22-NTU-TT-1034',
    fatherName: 'BASHARAT ALI',
    name: 'Ahmad Raza',
    dob: '29-08-2003',
    cnic: '33100-9889253-1',
    degreeType: 'Degree',
    program: 'BS Textile Engineering Technology',
    specialization: 'Textile Engineering Technology',
    session: '2022 - 2026',
    cgpa: '3.15 / 4.00',
    completionDate: 'July 24, 2026',
    transcriptNo: 'T005244',
    degreeNo: 'B009871',
    verifiedOn: '16-Oct-2026, 08:46 pm',
  },
  {
    regNo: '2022-NTU-CS-1293',
    fatherName: 'Taj ud Din',
    name: 'Muhammad Asad Taj',
    cnic: '33104-4092667-7',
    degreeType: 'Degree',
    program: 'Bachelor of Science in Software Engineering',
    specialization: 'Software Engineering',
    session: '2022 - 2026',
    cgpa: '2.87 / 4.00',
    completionDate: 'July 24, 2026',
    transcriptNo: 'T004761',
    degreeNo: 'B007763',
    verifiedOn: '16-Oct-2026, 04:03 pm',
  },
  {
    regNo: '2021-NTU-TE-0452',
    fatherName: 'Muhammad Riaz',
    name: 'Ayesha Khan',
    cnic: '33102-5588123-4',
    degreeType: 'Transcript',
    program: 'Bachelor of Science in Textile Engineering',
    specialization: 'Textile Engineering',
    session: '2021 - 2025',
    cgpa: '3.42 / 4.00',
    completionDate: 'July 18, 2025',
    transcriptNo: 'T003988',
    degreeNo: 'B006541',
    verifiedOn: '16-Oct-2026, 04:05 pm',
  },
  {
    regNo: '2020-NTU-BA-1108',
    fatherName: 'Abdul Rehman',
    name: 'Bilal Ahmed',
    cnic: '33100-1122334-1',
    degreeType: 'Degree',
    program: 'Bachelor of Business Administration',
    specialization: 'Finance',
    session: '2020 - 2024',
    cgpa: '3.10 / 4.00',
    completionDate: 'July 20, 2024',
    transcriptNo: 'T002455',
    degreeNo: 'B005102',
    verifiedOn: '16-Oct-2026, 04:06 pm',
  },
];

/**
 * Look up a record by registration number + document serial number.
 * Registration number match is case-insensitive and whitespace-tolerant,
 * exactly like a database lookup should be.
 */
export function verifyDocument({ regNo, docType, docNo }) {
  const clean = (s) => (s || '').trim().toUpperCase();
  const target = DEMO_RECORDS.find(
    (r) =>
      clean(r.regNo) === clean(regNo) &&
      clean(docType === 'degree' ? r.degreeNo : r.transcriptNo) === clean(docNo)
  );
  return target || null;
}

// A demo QR payload (the kind a printed QR code would decode to).
export const DEMO_QR_SAMPLE = {
  regNo: '2022-NTU-CS-1293',
  docType: 'degree',
  docNo: 'B007763',
};
