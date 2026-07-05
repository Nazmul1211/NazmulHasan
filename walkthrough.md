# Full-Stack Portfolio Migration & Dashboard Enhancements Walkthrough

The portfolio codebase has been successfully migrated from client-side `localStorage` data mocks to a database-backed, secure Next.js full-stack system, complete with drag-and-drop project reordering, access/refresh JWT authentication, settings profile updates, and client contact toast notifications.

---

## 🛠️ Work Accomplished

### 1. Database Setup & ORM (Prisma 7 + Neon PostgreSQL)
- **Schema Design** ([schema.prisma](file:///Users/nazmulhasan/Projects/NazmulHasan/prisma/schema.prisma)): Created three main tables:
  1. `Admin` (account credentials, including username, email, and password hash)
  2. `PortfolioSection` (dynamic key-value schema holding JSON contents of all portfolio pages)
  3. `ContactMessage` (client contact inbox messages)
  4. `BlogPost` (developer articles, containing title, slug, excerpt, content body text, tags list, cover image url, date, and read time)
- **Configuration** ([prisma.config.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/prisma.config.ts)): Setup connection url configurations targeting Neon serverless pooling adapter.
- **Client Factory** ([prisma.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/lib/prisma.ts)): Implemented a server-only singleton factory using `@prisma/adapter-pg` driver to connection pool PostgreSQL requests.
- **Database Reset & Seed** ([seed.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/prisma/seed.ts)): Reset all database tables to clear out test values and populated them with defaults, setting default admin credentials to `admin` / `mnhs1211@gmail.com` / `portfolio@admin` and seeding default + 3 new expert blog posts.

### 2. Access / Refresh Token JWT Flow (Authentication & Authorization)
- **Auth Utils** ([auth.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/lib/auth.ts)): Created helper methods for signing/verifying short-lived access tokens (15 mins) and long-lived refresh tokens (7 days).
- **Middleware Refresh Guard** ([middleware.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/middleware.ts)):
  - Guards `/admin/dashboard/*` and `/api/*` endpoints.
  - Automatically intercepts requests with expired access tokens and silently re-issues a new access token if the refresh token cookie is valid.
- **Client-Readable User Cookie**: Added a client-readable `nh_user_payload` cookie containing basic profile info (username) for optimal frontend login checks.
- **APIs**:
  - `/api/auth/login` (POST to check password and assign access, refresh, and payload cookies. Supports querying by email or username).
  - `/api/auth/logout` (POST to wipe all auth cookies).
  - `/api/auth/me` (GET session status with refresh fallback).
  - `/api/auth/profile` (GET to fetch email and username, PUT to update admin profile details).
  - `/api/auth/password` (PUT to update hashed password in database).

### 3. Portfolio & Blog Dynamic Pages
- **API Nodes**:
  - `/api/portfolio` (GET whole portfolio data)
  - `/api/portfolio/[section]` (GET section data, PUT to update section JSON)
  - `/api/contact` (POST to submit public messages, GET to retrieve all message history)
  - `/api/messages/[id]` (PATCH status, DELETE records)
  - `/api/blog` (GET list of posts, POST to create a new post)
  - `/api/blog/[id]` (PUT to edit a post, DELETE to delete a post)
- **Frontend Pages**:
  - Landing page ([page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/page.tsx)): Converted to server component loading database records directly.
  - Homepage Blog section ([Blog.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/components/Blog.tsx)): Converted to Server Component loading top 3 published posts from the database dynamically.
  - Main Blog listing page ([page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/blog/page.tsx)): Queries published articles from DB.
  - Blog post details page ([page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/blog/%5Bslug%5D/page.tsx)): Converted to fetch dynamic post by slug and throw `notFound()` for drafts.
  - Project detail page ([page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/projects/%5Bslug%5D/page.tsx)): Converted to dynamic database loader.
  - Contact form ([Contact.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/components/Contact.tsx)): Converted from `mailto` schema to backend direct POST.

### 4. Admin Dashboard & Project/Blog Enhancements
- **Draggable Reordering**: Implemented native HTML5 Drag and Drop reordering handles (Lucide `GripVertical`) on project cards in the dashboard list.
- **Project CRUD Controls**: Added a "Create New Project" modal with automatic slug generator (e.g., `Tuition Port` -> `tuition-port`) and a "Delete Project" action (Lucide `Trash2`) next to each card.
- **Draft / Publish Status Badges**: Added visual indicators for project status (green `Published` badge, red `Draft` badge) and a toggle checkbox within the editor modal.
- **Gutenberg-style Blog Posts Dashboard Panel** ([blog/page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/admin/dashboard/blog/page.tsx)):
  - Built a comprehensive CMS interface for articles list, create post modal, auto-slug generator, edit modal, delete button, and published checkbox toggles.
  - Added a WordPress Gutenberg-inspired code/preview split editor tab selector.
  - Integrated a rich formatting quick-action toolbar to wrap/inject HTML tags (headers, paragraphs, bold, lists, code snippet blocks, hyperlinks, image templates) at the cursor position.
  - Developed an autocomplete block dropdown triggered by entering a forward slash (`/`) inside the content textarea. Supports keyboard arrow navigation (`ArrowUp`, `ArrowDown`), item selection (`Enter`), and closing the menu (`Escape`).
  - Designed an expandable full-screen canvas layout and enabled vertically resizable textareas to customize editing height.
  - Registered section in sidebar navigation config ([adminConfig.ts](file:///Users/nazmulhasan/Projects/NazmulHasan/lib/adminConfig.ts)).
- **CMS Page Editors**: Refactored editors for Hero, About, Skills, Projects, Experience, Education, and Contact.
- **Inbox** ([messages/page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/admin/dashboard/messages/page.tsx)): Built inbox dashboard to read, mark as read, delete, and reply to client emails.
- **Settings** ([settings/page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/admin/dashboard/settings/page.tsx)):
  - Built two modern card editors: **Account Profile** (to update your admin email/username) and **Security** (to update your password).
  - Added password eye toggles to all fields and instant password match verification alerts.
- **Login Portal** ([admin/page.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/app/admin/page.tsx)): Upgraded to support login with email, show/hide eye toggle, generic placeholder values, removed default footnote, and added a glassmorphic **Back to Website** navigation button overlay at the top left of the viewport.

### 5. Premium Toast Notification Feedbacks
- Added dynamic sliding toast alerts ([Contact.tsx](file:///Users/nazmulhasan/Projects/NazmulHasan/components/Contact.tsx) and [Contact.module.css](file:///Users/nazmulhasan/Projects/NazmulHasan/components/Contact.module.css)) on public message submission with custom glassmorphism, check/error icons, entry slide-in transitions, and automatic 5-second fade dismissals.

---

## 🧪 Verification & Build Status

### 1. Database Sync & Seeding
Ran sync and seed commands:
```bash
npx prisma db push --force-reset
npx prisma generate
npx prisma db seed
```
**Result**: Applied PostgreSQL schema alterations and successfully updated seed records (admin + all portfolio sections + blog posts) in 10s.

### 2. Next.js Turbo Build Compilation
Ran standard Next.js build compilation check:
```bash
npm run build
```
**Result**: `✓ Compiled successfully in 2.9s` and generated all static, dynamic server-rendered pages and API endpoints with zero type/lint errors.
