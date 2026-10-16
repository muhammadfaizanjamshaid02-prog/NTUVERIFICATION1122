# Document Verification Portal (React)

NTU Faisalabad ke **Document Verification Portal** (`lms.ntu.edu.pk/verify`) ka React
(Vite) mein banaya hua clone — practice/demo ke liye. UI aur flow original jaisa
hai, lekin yeh **demo build** hai: verification ek sample dataset
(`src/data/records.js`) ke against hoti hai, asal NTU database se connected nahi.

## Features

- **Verification form** — Registration Number, Document Type (Degree/Transcript),
  Degree No / Transcript No → "Verify Now"
- **Loading state** — "Verifying document, please wait…" (+ Urdu line, original jaisa)
- **Success card** — name, father's name, CNIC, degree, specialization, session,
  CGPA, completion date, transcript/degree numbers + disclaimer
- **Record Not Found** — original wali guidance, alumni box aur Examination
  Department contact
- **QR verification** — mobile par "Verify via QR Code" button (desktop par hidden,
  original ki tarah); demo mode mein sample record scan simulate hota hai
- **How-to guide** — 4 steps + QR step, English + Urdu (bilingual, original jaisa)
- **Common Issues**, **Downloads**, **Contact Us**, **Staff Login** (demo modal)
- Responsive layout, Bootstrap 5 + Font Awesome CDN, Google Fonts (Maven Pro,
  Work Sans, Roboto, Fjalla One — original wali families)

## Chalane ka tareeqa

```bash
cd document-verification-portal
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build       # dist/ folder mein static files
npm run preview     # build ko locally serve karke dekhna
```

## Try karne ke liye sample data

| Registration No     | Type       | Document No |
|---------------------|------------|-------------|
| `2022-NTU-CS-1293`  | Degree     | `B007763`   |
| `2022-NTU-CS-1293`  | Transcript | `T004761`   |
| `2021-NTU-TE-0452`  | Transcript | `T003988`   |
| `2020-NTU-BA-1108`  | Degree     | `B005102`   |

Kuch aur likhein ge to "Record Not Found" wala flow dekhega.

## Project structure

```
src/
├── main.jsx                  # entry point
├── App.jsx                   # page composition + smooth-scroll nav
├── index.css                 # poora theme (custom CSS)
├── data/
│   └── records.js            # demo dataset + verifyDocument() lookup
└── components/
    ├── Navbar.jsx            # top bar + LOG IN / nav links
    ├── LoginModal.jsx        # staff login (demo modal)
    ├── VerifySection.jsx     # form + loading/success/not-found states
    ├── ResultCard.jsx        # "Verification Successful" card
    ├── NotFoundCard.jsx      # "Record Not Found" card
    ├── QrModal.jsx           # QR scan modal (mobile flow)
    ├── HowToGuide.jsx        # bilingual how-to + common issues
    ├── Downloads.jsx         # downloads section
    ├── ContactSection.jsx    # Examination Department contact + form
    └── Footer.jsx            # footer (MIS credit, disclaimer)
```

## Real backend se jorna ho to

`verifyDocument()` in `src/data/records.js` ko apne API call se replace kar dein
(e.g. `fetch('/api/verify', …)`), baqi UI waisa ka waisa kaam karega.

## Note

Yeh UI practice/educational demo hai — National Textile University se affiliated
nahi, aur is mein koi asal student record nahi hai.

## Troubleshooting

**Windows par `npm run dev` mein `Cannot find module @rollup/rollup-win32-x64-msvc` error:**

Yeh Vite/npm ka known bug hai — optional (platform-specific) dependency install
nahi hoti. Fix:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

Dobara `npm install` karne par npm Windows wala native package khud utha lega.
(Agar masla phir bhi rahe to `npm install -D @rollup/rollup-win32-x64-msvc`
chalayein.)
