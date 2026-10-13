# 🏛️ Royal Park Condominium Management System

An enterprise-grade, high-end residence and facility management platform built for **Royal Park Condominium Twin Towers**, Colombo.

![Royal Park Condominium](/public/hero.jpeg)

---

## 🌟 Tech Stack & Architecture

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS with Glassmorphism
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data Analytics**: [Recharts](https://recharts.org/)
- **Database & ODM**: [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark theme default `#090D16` & Light mode `#F8FAFC`)

---

## 🏢 Core Features & Modules

1. **Custom Twin Tower Preloader & Brand Logo**:
   - Animated SVG silhouette drawing effect of the twin towers with spires and connecting skybridge.
2. **Hero Landing Page (`/`)**:
   - Full-screen architectural hero view displaying `/hero.jpeg`, dynamic feature chips, and smooth transition to the dashboard.
3. **Dynamic Navigation Layout Switcher**:
   - Switch seamlessly between **Left Vertical Sidebar** (default) and **Top Horizontal Navigation Bar** with a single click.
4. **Interactive Guidance System (Info Modals)**:
   - Dedicated glassmorphism modal on every module header providing feature overviews, step-by-step how-to guidance, and administrative tips.
5. **Executive Overview Dashboard (`/dashboard`)**:
   - High-level KPIs: Total Units (280), Occupancy Rate (95.7%), Active Leaves, Policy Alerts, Monthly Operations & Payroll summary.
   - Interactive Recharts: Late Arrival Trend Area Chart, Leave Allocation Donut Chart, Overtime Cost Breakdown, and Multi-Year Performance Progress.
6. **Profile Module (`/dashboard/profile`)**:
   - Full demographic registry: role title, employment grade, civil status, spouse particulars, and dynamic dependent children list.
7. **Payroll & OT Module (`/dashboard/payroll`)**:
   - Executive base compensation, annual bonus targets, staff loans ledger, and interactive sliders for 1.5x Single OT and 2.0x Double OT with real-time recalculations.
8. **Qualifications Module (`/dashboard/qualifications`)**:
   - Academic degrees (B.Sc., M.Sc.) and professional licenses (CFM, LEED, NFPA) with add/delete CRUD actions.
9. **Training & Dev Module (`/dashboard/training`)**:
   - Continuous Professional Development (CPD) credits tracker, compliance audits, ongoing courses with progress bars, and mandatory statutory checklists.
10. **Annual Performance Module (`/dashboard/performance`)**:
    - Multi-year appraisal history (2023–2025 scores and ratings), core strategic focus editor, and interactive milestone checkboxes.
11. **Leave Details Module (`/dashboard/leave`)**:
    - Dynamic increment/decrement (`+` / `-`) buttons for Annual, Casual (Pre/Post-Approved), and Medical leaves, accompanied by a No-Pay absenteeism red alert.
12. **Late Attendance Module (`/dashboard/attendance`)**:
    - Month-to-Date (MTD) arrival delays, policy threshold configurator (2, 3, 4, 5 limits), real-time status badge (Compliant / Watchlist / Breach), and late incident logging.
13. **Disciplinary Module (`/dashboard/disciplinary`)**:
    - Formal caution letters categorized by severity tiers (Low, Medium, High, Critical), status management (Active, Resolved, Expired), "+ Issue Warning" modal, and expandable counseling logs.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ or v20+
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
git clone https://github.com/vimukthi77/RoyalPark.git
cd RoyalPark
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_APP_NAME="Royal Park Condominium"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build
```bash
npm run build
npm run start
```

---

## 📄 License
Proprietary & Confidential • Royal Park Condominium Estate Management © 2026.
