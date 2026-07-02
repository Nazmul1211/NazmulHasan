# Nazmul Hasan — Professional Developer Portfolio

A premium, responsive, and performance-optimized developer portfolio built with Next.js, TypeScript, and CSS Modules. It features scroll-driven entry transitions, active nav tracking, dynamic project showcase details, and a client-side admin dashboard for managing content.

## 🚀 Core Features

- **Developer Syntax Theme:** Clean, developer-centric branding (featuring the dynamic `<nh.dev />` logo).
- **Interactive UI/UX:** Frosted glassmorphism design, floating background gradient blobs, and custom ease scroll reveals.
- **Accurate Skills Tracker:** Staggered visual proficiency bars that dynamically animate to their exact percentages.
- **Project Detail Pages (`/projects/[slug]`):** Static Site Generation (SSG) routes showing challenges, stack badges, and future improvement plans.
- **Client-Side Admin Panel (`/admin`):** Integrated content manager to update Hero, About, Skills, Projects, Experience, Education, and Contact details instantly.
- **Global Theme Engine:** Built-in light and dark mode toggles synchronized via CSS variables and `localStorage`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules, Custom Animations, Variable tokens
- **Icons:** Lucide React, Inline SVGs
- **Build Easing:** Static HTML Pre-rendering (SSG) for ultra-fast loading

---

## 📂 Project Structure

```
├── app/
│   ├── admin/             # Password-protected Admin login & sidebar dashboard
│   ├── blog/              # Blog landing and detailed article routes
│   ├── projects/          # Dynamic project details routes [slug]
│   ├── globals.css        # Theme variables, layouts, and global animation frames
│   ├── layout.tsx         # Layout wrapper mounting
│   └── page.tsx           # Home landing page sections
├── components/            # Reusable UI & section containers
├── data/
│   └── portfolioData.ts   # Centralized portfolio data (Single Source of Truth)
├── lib/
│   └── adminConfig.ts     # Admin panel passwords, storage keys, and sections config
└── public/                # Static assets (Resume PDF, icons)
```

---

## ⚙️ Setup & Development

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the client-facing site or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

### 3. Production Build
Compile and verify static page generations:
```bash
npm run build
```

---

## 🔐 Admin Panel Management

The admin dashboard operates on client-side storage for local previews and data staging:
1. Navigate to `/admin` and authenticate using the password configured in `lib/adminConfig.ts` (Default: `portfolio@admin`).
2. Make your edits inside any dashboard section editor tab.
3. Click **Save Changes** to immediately preview edits in your browser (saved to `localStorage`).
4. Click **Export JSON** to download a structural copy of your new data, then copy-paste the values into `data/portfolioData.ts` to persist changes globally for deployment.
