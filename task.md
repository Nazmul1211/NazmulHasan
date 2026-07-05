# Full-Stack Backend Implementation Task List

## Phase 1 — Setup & Dependencies
- [x] Install packages (prisma, @prisma/client, bcryptjs, jose, http-status-codes, tsx, @prisma/adapter-pg, pg)
- [x] Update .env with DATABASE_URL, DIRECT_URL, JWT_SECRET, ADMIN_USERNAME
- [x] Add prisma config with seed command to prisma.config.ts

## Phase 2 — Prisma Schema & DB Client
- [x] Create prisma/schema.prisma (Admin, PortfolioSection, ContactMessage)
- [x] Create lib/prisma.ts (singleton Prisma client with pg.Pool and PrismaPg adapter)
- [x] Create prisma/seed.ts (seed admin + 7 portfolio sections using the singleton client)

## Phase 3 — Auth Library & Middleware
- [x] Create lib/auth.ts (signJWT, verifyJWT, hashPassword, comparePassword)
- [x] Create middleware.ts (route guard for /admin/dashboard + /api except public auth/contact)

## Phase 4 — API Routes
- [x] Create app/api/auth/login/route.ts
- [x] Create app/api/auth/logout/route.ts
- [x] Create app/api/auth/me/route.ts
- [x] Create app/api/auth/password/route.ts (change password)
- [x] Create app/api/portfolio/route.ts (GET global portfolio data)
- [x] Create app/api/portfolio/[section]/route.ts (GET/PUT section)
- [x] Create app/api/contact/route.ts (POST=public, GET=admin)
- [x] Create app/api/messages/[id]/route.ts (PATCH=read, DELETE)

## Phase 5 — Frontend Updates
- [x] Update app/admin/page.tsx (POST /api/auth/login)
- [x] Update app/admin/dashboard/layout.tsx (GET /api/auth/me + logout)
- [x] Update app/admin/dashboard/hero/page.tsx (GET/PUT /api/portfolio/hero)
- [x] Update app/admin/dashboard/about/page.tsx (GET/PUT /api/portfolio/about)
- [x] Update app/admin/dashboard/skills/page.tsx (GET/PUT /api/portfolio/skills)
- [x] Update app/admin/dashboard/projects/page.tsx (GET/PUT /api/portfolio/projects)
- [x] Update app/admin/dashboard/experience/page.tsx (GET/PUT /api/portfolio/experience)
- [x] Update app/admin/dashboard/education/page.tsx (GET/PUT /api/portfolio/education)
- [x] Update app/admin/dashboard/contact/page.tsx (GET/PUT /api/portfolio/contact)
- [x] Create app/admin/dashboard/messages/page.tsx (inbox message list, view details, mark as read, delete)
- [x] Create app/admin/dashboard/settings/page.tsx (change password)
- [x] Update lib/adminConfig.ts (add messages + settings sections, remove credentials fields)
- [x] Update components/Contact.tsx (real POST /api/contact form)
- [x] Update components/Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Experience.tsx, Education.tsx (pull dynamic props)
- [x] Update app/page.tsx (server side load and render portfolio sections)
- [x] Update app/projects/[slug]/page.tsx (server side load project details by slug)

## Phase 6 — DB Setup & Verification
- [x] Run npx prisma generate
- [x] Run npx prisma db push
- [x] Run npx prisma db seed
- [x] Run npm run build (full type check)

## Phase 7 — Projects Section Enhancements (Reordering, CRUD, Status)
- [x] Add `published` status to `Project` interface and default data in `data/portfolioData.ts`
- [x] Implement publish filtering in `components/Projects.tsx`
- [x] Implement publish access restrictions in `app/projects/[slug]/page.tsx`
- [x] Implement HTML5 drag-and-drop reordering in `app/admin/dashboard/projects/page.tsx`
- [x] Add "Create Project" option with automatic slug generation in `app/admin/dashboard/projects/page.tsx`
- [x] Add "Delete Project" option in `app/admin/dashboard/projects/page.tsx`
- [x] Add "Published" toggle and visual status badges in `app/admin/dashboard/projects/page.tsx`
- [x] Run `npm run build` to verify type safety and Turbopack compilation.

## Phase 8 — Access/Refresh JWT Auth & Contact Toast Notifications
- [x] Refactor `lib/auth.ts` with access/refresh cookie keys and sign functions.
- [x] Refactor `middleware.ts` to implement automatic silent token refreshing.
- [x] Refactor `/api/auth/login`, `/api/auth/logout`, `/api/auth/me` routes for token handles.
- [x] Update `components/Contact.tsx` and `Contact.module.css` with a custom animated Toast.
- [x] Run `npm run build` to verify type safety and compilation.

## Phase 9 — Admin Settings Upgrade (Email, Eye Icon Toggles, Match Verification)
- [x] Add `email` field to `Admin` model in `prisma/schema.prisma`.
- [x] Update `prisma/seed.ts` to seed `mnhs1211@gmail.com`.
- [x] Refactor `/api/auth/login/route.ts` to query `Admin` by username or email.
- [x] Create `/api/auth/profile/route.ts` to update admin email and username.
- [x] Refactor `app/admin/page.tsx` with email input, eye toggle, and remove footnote.
- [x] Refactor `app/admin/dashboard/settings/page.tsx` with profile form, password match indicators, and eye toggles.
- [x] Run `npm run build` to verify type safety and compilation.

## Phase 10 — Manageable Blog Section (CMS)
- [x] Add `BlogPost` model to `schema.prisma` with title, slug, excerpt, content, tags, readTime.
- [x] Run `npx prisma db push` to synchronize table columns.
- [x] Re-run `npx prisma generate` to rebuild TypeScript typings.
- [x] Update `seed.ts` to populate DB table with default blog posts.
- [x] Create `/api/blog` and `/api/blog/[id]` GET, POST, PUT, DELETE endpoints.
- [x] Update `app/blog/page.tsx` list and `app/blog/[slug]/page.tsx` detail pages to query DB.
- [x] Convert homepage `components/Blog.tsx` to Server Component querying top 3 published posts from DB.
- [x] Create admin panel interface in `app/admin/dashboard/blog/page.tsx` with CRUD modals, auto-slug generator, and publish state toggles.
- [x] Register Blog section link in sidebar navigation settings (`lib/adminConfig.ts`).
- [x] Integrate Gutenberg-inspired code/preview split editor, quick formatting toolbar, and resizable layout textareas.
- [x] Integrate floating slash autocomplete command dropdown triggered by typing '/' in the blog editor.
- [x] Run `npm run build` to compile the entire project with zero warnings.
