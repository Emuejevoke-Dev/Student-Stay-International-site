# 🎓 StudentStay International

> **Verified Global Living & Tenancy Escrow Platform for International Students**  
> Physical room inspections, 360° virtual tours, verified university commutes, and 100% escrow-backed tenancies across the **UK, USA, Canada, Germany, and Australia**.

---

## 🌟 Overview

**StudentStay International** is a web platform designed to solve international student housing scams and relocation challenges. Students can explore verified accommodations near their university campus, inspect rooms via 360° virtual tours, chat with verified student ambassadors, lock rooms in safe escrow before landing, and access a dedicated landlord & property manager executive dashboard.

---

## 🚀 Key Features

### 1. 🔐 Safe Authentication & Account Security
- **Direct Sign Up Link Gateway**: When visitors click the link to the site without an active session, they are automatically directed to the sign up portal (`signup.html`) to register or sign in before entering the home dashboard.
- **Create Account First**: Seamless onboarding prioritizing account registration before sign in.
- **Strict Email Verification**: Rejection logic that prevents unregistered or strange emails from signing in without creating an account first, with one-click transition to registration.
- **Remembered Initials & Accounts**: Remembers the last registered/signed-in user with dynamic monogram initials (e.g. `JD` for Jane Doe, `MA` for Madonna) across the navbar and portal greetings.
- **Session Persistence**: Full `localStorage` synchronization across all 10 portal pages.

### 2. 📱 Responsive Navigation & Mobile Tab Button
- **Left-Aligned Mobile Toggle Tab**: On small and medium screens, the navigation tab toggle button sits cleanly on the lower left-hand side (`All Tabs` / `All 7 Tabs`).
- **No Duplicate Nav Bars**: Desktop horizontal tab bar is hidden on mobile devices, preventing duplicate controls.
- **Micro-Animations**: Smooth chevron rotation and animated dropdown drawer showcasing all navigation links, transit maps, and quick booking shortcuts.

### 3. 🌗 High-Contrast Dark & Light Mode Engine
- Curated color palettes with contrast safeguards ensuring that all headers, descriptions, badges, pills, inputs, and buttons are legible in both Dark Mode (`#070d18` deep navy) and Light Mode (`#f8fafc` crisp slate).
- Universal button shields protecting primary action buttons (`bg-sky-600`, `bg-amber-500`, gradients) from unwanted theme color overrides.

### 4. 💱 Real-Time Multi-Currency Engine
- Instant conversion between **GBP (£)**, **USD ($)**, **EUR (€)**, **NGN (₦)**, **INR (₹)**, and **CNY (¥)** across weekly rents, bills, deposits, and fee estimates.

### 5. 🏠 Verified Properties & 360° Virtual Tours
- Full listing search with multi-faceted filtering: country, state/city, university, room type, budget, and amenities.
- Interactive 360° panorama tour viewer with hotspots, floor plans, and room specifications.

### 6. 💬 Live Peer Chat & Community Insights
- Real-time peer messaging with current university residents and ambassadors.
- Dynamic community FAQ accordion with answers to accommodation questions.

### 7. 👔 Property Owner & Letting Agent Executive Dashboard
- Dedicated owner portal (`agent.html`) featuring:
  - Executive tenancy KPIs and revenue stats.
  - Active tenant roster with lease dates and payment statuses.
  - Barclays Escrow & "No Visa, No Pay" refund management queue.
  - Live occupancy and traffic feed.
  - One-click CSV audit exporter.

---

## 📁 Repository Structure

```
STUDENT-STAY/
├── index.html            # Main home portal with auto-carousel & quick search
├── about.html            # Company mission, trust & escrow verification policy
├── find-home.html        # Comprehensive search & filter catalog for residences
├── profile.html          # Student tenancy portal, room booking & escrow cert
├── tours.html            # 360° interactive virtual room tour explorer
├── map.html              # University campus transit & commute time mapping
├── insights.html         # University city guides & community FAQ
├── residents.html        # Verified student ambassador directory
├── chat.html             # Real-time peer resident live chat application
├── agent.html            # Property owner & letting agent executive dashboard
├── signup.html           # Authentication portal (Create Account & Sign In)
├── assets/
│   ├── css/
│   │   └── style.css     # Design tokens, high-contrast theme engine, animations
│   ├── js/
│   │   ├── app.js        # Core logic: AuthManager, MobileNavManager, ThemeManager
│   │   └── data.js       # Verified property database, FAQs, ambassadors, cities
│   └── images/           # Curated student portraits, panoramas & property photos
├── scratch/              # Automated verification & test suites
├── .gitignore            # Git configuration file
└── README.md             # Project documentation
```

---

## 💻 Getting Started Locally

### Prerequisites
Any modern web browser (Chrome, Firefox, Safari, Edge) or a local HTTP server (Live Server, Python, Node.js).

### Option 1: Live Server / Direct Browser
Double-click `index.html` to open it directly in your browser, or use VS Code's **Live Server** extension on port `5500`.

### Option 2: Python Simple HTTP Server
```bash
python -m http.server 5500
```
Open [http://localhost:5500](http://localhost:5500) in your browser.

### Option 3: Node.js HTTP Server
```bash
npx serve .
```

---

## 🧪 Testing & Verification

The repository includes test suites in the `scratch/` directory:
```bash
node scratch/test_complete_verification.js
```
Validates:
- Responsive mobile toggle tab presence and drawer structure across all 10 pages.
- Authentication tab order (Create Account before Sign In).
- Strict email rejection for unregistered emails.
- Monogram initial computation for single and multi-word student names.

---

## 🛡️ Escrow & Tenancy Guarantee

Every tenancy on StudentStay is backed by **100% Escrow Protection** and our **"No Visa, No Pay"** guarantee:
- Holding deposits are held in independent trust accounts.
- If a student visa is refused or delayed, 100% of the deposit is refunded within 48 hours without administrative deductions.

---

## 📄 License
This project is licensed under the MIT License.
