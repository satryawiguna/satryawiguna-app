# Satryawiguna Website — Project Instructions

Loaded automatically into every agent. Contains shared facts that do not need to be repeated in individual agent files.

---

## Project Identity

**Type**: Next.js 15 monorepo — personal portfolio frontend  
**Stack**: Next.js 15 (App Router) · TypeScript 5 (strict) · Turborepo · pnpm 9  
**Styling**: MUI v5 (dark theme) + Tailwind CSS 3  
**State**: Redux Toolkit + TanStack React Query  
**Forms**: Formik + Yup (shared schemas in `packages/ui`)  
**API Client**: Axios (with automatic 401 token refresh via `shared/api`)  
**Deployment**: Docker multi-stage builds + Nginx reverse proxy

**Apps**:
| App | Port (dev) | Port (Docker dev) | Port (Docker prod) | Description |
|-----|-----------|-------------------|-------------------|-------------|
| `apps/web` | 3000 | 3002 | 3004 | Public portfolio website |
| `apps/admin` | 3001 | 3003 | 3005 | Admin dashboard |

---

## Monorepo Structure

```
satryawiguna-website/
├── apps/
│   ├── web/             # Public portfolio: pages, components, data, hooks
│   └── admin/           # Admin dashboard: pages, components, hooks, use cases
├── packages/
│   ├── ui/              # Shared UI: FormikTextField, Button, Card, Loading, Yup schemas
│   └── utils/           # Helpers: format, storage, validation
└── shared/
    ├── types/           # All TypeScript interfaces (User, Auth, Project, Blog, etc.)
    ├── api/             # Axios API client + 13 domain services + interceptors
    ├── store/           # Redux Toolkit store (auth + user slices)
    ├── constants/       # App config, validation rules, HTTP codes, routes, storage keys
    └── datatable/       # Reusable dark-themed Datatable component
```

---

## Clean Architecture — Layer Hierarchy

Each app follows strict top-to-bottom dependency. Never skip or reverse.

```
src/presentation/    → React components, pages, hooks, MUI theme (UI layer)
src/domain/          → Business entities, use cases (business logic)
src/data/            → Repositories that call shared API services (data access)
src/infrastructure/  → Config, utilities (external services)
```

**Dependency rule**: Presentation → Domain → Data → Infrastructure. A layer can only depend on layers below it.

### App-specific layer mapping

#### `apps/web/`

```
src/app/             → Next.js App Router pages (page.tsx, layout.tsx)
src/presentation/    → components/ (home, blog, projects, about, resume, common, providers), hooks/, theme/
src/data/            → blog.ts, projects.ts (static data, repositories)
src/domain/          → entities/, usecases/ (business logic)
src/infrastructure/  → config/, utils/
```

#### `apps/admin/`

```
src/app/             → Next.js App Router pages + dashboard CRUD pages
src/presentation/    → components/ (auth, common, dashboard/*, forms, providers), hooks/, theme/
src/domain/          → entities/, usecases/ (35+ use case classes)
src/data/            → repositories/ (12 repositories wrapping shared-api services)
src/infrastructure/  → config/, utils/
```

**Implementation order for any new feature**:  
Type definition in `shared/types` → API service in `shared/api` (if new endpoint) → Repository in `src/data/repositories` → Use case in `src/domain/usecases` → React hook in `src/presentation/hooks` → Component/Page in `src/presentation/components`

---

## Shared Packages

| Package            | Path                | Contents                                                                          |
| ------------------ | ------------------- | --------------------------------------------------------------------------------- |
| `shared-types`     | `shared/types/`     | 13 entity files (User, Auth, Project, Blog, Skill, Media, etc.) + common types    |
| `shared-api`       | `shared/api/`       | Axios `ApiClient` with 401 auto-refresh + 13 service classes                      |
| `shared-store`     | `shared/store/`     | Redux Toolkit store (`authSlice`, `userSlice`) + typed hooks                      |
| `shared-constants` | `shared/constants/` | APP_CONFIG, VALIDATION rules, HTTP_STATUS, ROUTES, STORAGE_KEYS, DATE_FORMATS     |
| `shared-datatable` | `shared/datatable/` | Generic `<Datatable<T>>` with search, pagination, toolbar                         |
| `ui`               | `packages/ui/`      | FormikTextField, FormikCheckbox, FormikSelect, Button, Card, Loading, Yup schemas |
| `utils`            | `packages/utils/`   | format.ts, validation.ts, storage.ts                                              |

---

## Route Structure

### `apps/web/` — Public portfolio

| Page           | Route                   | Description                                              |
| -------------- | ----------------------- | -------------------------------------------------------- |
| Home           | `/`                     | HeroBanner, KeyExpertise, TechnicalPhilosophy            |
| Projects       | `/projects`             | ProjectsHero, ProjectsGrid, ProjectsCTA                  |
| Project detail | `/projects/[id]/detail` | Individual project with metrics                          |
| Blog           | `/blog`                 | BlogHero, Search, FeaturedPost, BentoGrid                |
| Blog detail    | `/blog/[id]/detail`     | Individual blog post                                     |
| About          | `/about`                | AboutHero, VideoPlayer, BioCard, CareerImpact, TechStack |
| Resume         | `/resume`               | Experience, Education, TechStack, Strengths              |
| Contact        | `/contact`              | Redirects to home (contact via drawer)                   |

### `apps/admin/` — Admin dashboard

| Page        | Route                    | Auth      | Description                     |
| ----------- | ------------------------ | --------- | ------------------------------- |
| Login       | `/login`                 | Public    | 2FA: email → OTP verification   |
| Register    | `/register`              | Public    | Registration form               |
| Dashboard   | `/dashboard`             | Protected | Stats, activity, system metrics |
| Projects    | `/dashboard/projects`    | Protected | CRUD with Datatable + Drawer    |
| Blog Posts  | `/dashboard/blogs`       | Protected | CRUD with Markdown editor       |
| Categories  | `/dashboard/categories`  | Protected | CRUD                            |
| Tags        | `/dashboard/tags`        | Protected | CRUD                            |
| Skills      | `/dashboard/skills`      | Protected | CRUD                            |
| Users       | `/dashboard/users`       | Protected | Admin user management           |
| Media       | `/dashboard/medias`      | Protected | Media library                   |
| Experiences | `/dashboard/experiences` | Protected | CRUD                            |
| Educations  | `/dashboard/educations`  | Protected | CRUD                            |
| Settings    | `/dashboard/settings`    | Protected | Key-value config                |

**Auth middleware** (`apps/admin/src/middleware.ts`): Protected routes (`/dashboard/*`) redirect to `/login` if no `auth-token` cookie. Public paths (`/login`) redirect to `/dashboard` if already authenticated.

---

## Code Conventions

### Naming

| Layer            | Convention                | Example                                        |
| ---------------- | ------------------------- | ---------------------------------------------- |
| Page component   | PascalCase, `page.tsx`    | `export default function BlogPage()`           |
| Layout component | PascalCase, `layout.tsx`  | `export default function DashboardLayout()`    |
| UI component     | PascalCase                | `HeroBanner`, `BlogSearch`, `ProjectForm`      |
| Hook             | `use<Name>`               | `useProjects`, `useBlogPosts`, `useAuth`       |
| Use case         | `<Action><Entity>UseCase` | `GetProjectsUseCase`, `CreateProjectUseCase`   |
| Repository       | `<Entity>Repository`      | `ProjectRepository`, `BlogPostRepository`      |
| Service          | `<Entity>Service`         | `AuthService`, `BlogPostService`               |
| Type/Interface   | PascalCase                | `AuthUser`, `BlogPostDetail`, `ProjectFilters` |
| Slice            | `<name>Slice`             | `authSlice`, `userSlice`                       |

### Style

- **Imports order**: Local (`@/...`) → Workspace (`shared-*`, `ui`, `utils`) → External (React, MUI, Formik, etc.)
- **React components**: `'use client'` directive at top for client components. Server components by default.
- **File structure**: One component per file, exported as named export + function declaration
- **State management**: React Query for server state (API data). Redux for client state (auth, user preferences). Local state for UI-only concerns.
- **Forms**: Formik + Yup with shared schemas from `packages/ui/src/validation/schemas.ts`
- **MUI theme**: Both apps use dark mode themes defined in `src/presentation/theme/`. Web: primary `#00dbe9`, secondary `#742fe5`. Admin: primary `#0ea5e9`, secondary `#8b5cf6`.
- **CSS**: Tailwind utility classes for layout/spacing. MUI `sx` prop for component-level styles.
- **API calls**: Always go through the repository → use case → hook chain. Never call API services directly from components.

---

## Git Workflow

| Branch type       | Pattern                             | CI trigger                      |
| ----------------- | ----------------------------------- | ------------------------------- |
| Feature           | `feature/short-description`         | CI (lint) on push               |
| Bug fix           | `bugfix/short-description`          | CI (lint) on push               |
| Release candidate | `rc/vX.Y.Z`                         | CI + Build + Deploy-dev on push |
| Production        | merge from `rc/*` → manual dispatch | Deploy-prod                     |

**Commit messages follow Conventional Commits** (scoped format):

```
feat(web): add project filtering by skill on projects page
feat(admin): add bulk delete for media items
fix(admin): resolve 2FA OTP input focus issue
refactor(ui): extract shared validation schemas into packages/ui
chore(deps): upgrade next to 15.2.0
test(admin): add Vitest tests for useProjects hook
```

---

## CI/CD Pipeline

```
feature/** / bugfix/**  →  ci.yml      (lint: next lint)
rc/**                   →  ci.yml      (lint gate)
                        →  build.yml   (Docker build + push :dev and :latest to Docker Hub)
                        →  deploy-dev.yml  (auto-deploy :dev to dev server)
workflow_dispatch       →  deploy-prod.yml (promote :dev → :latest → prod)
```

Required GitHub Secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `PROD_SSH_HOST`, `PROD_SSH_USER`, `PROD_SSH_KEY`, `PROD_SSH_APP_DIR`, `DEV_SSH_HOST`, `DEV_SSH_USER`, `DEV_SSH_KEY`, `DEV_SSH_APP_DIR`, `NEXT_PUBLIC_API_URL_DEV`, `NEXT_PUBLIC_API_URL_PROD`

---

## Agent Pipeline

```
@orchestrator → Full pipeline coordinator (delegates + gates on verdicts)
@architect    → "Should we?" — ADR + system-level decisions (before @planner for major changes)
@planner      → Task table (feature decomposition across monorepo)
@implementer  → Code (one task at a time, gated by verification)
@reviewer     → Code quality gate (APPROVED / NEEDS REVISION)
@tester       → Test file generation + Vitest run
@documentation → README, JSDoc/TSDoc, changelog
@security     → OWASP audit (pre-deploy gate)
@performance  → Bundle/lighthouse audit (pre-deploy gate)
@devops       → Docker build, migrate, deploy
```

Each agent's scope is strictly bounded — agents do not duplicate each other's work.

---

## Shared Context

Product vision, business rules, glossary, and API contracts shared across all
sibling projects live in a dedicated GitHub repo. **Do not duplicate this content
in local files** — load it from the source via MCP when needed.

| Source      | URL                                                                       |
| ----------- | ------------------------------------------------------------------------- |
| Shared repo | `https://github.com/satryawiguna/satryawiguna-shared`                     |
| Raw base    | `https://raw.githubusercontent.com/satryawiguna/satryawiguna-shared/main` |

### Shared Context Files (by agent need)

| File                               | Purpose                                                              | Needed by                           |
| ---------------------------------- | -------------------------------------------------------------------- | ----------------------------------- |
| `business/glossary.md`             | Domain term definitions (User, Experience, Skill, etc.)              | All agents                          |
| `business/business-rules.md`       | Domain invariants and constraints (BA-1 through BCF-26)              | @architect, @planner, @reviewer     |
| `architecture/bounded-contexts.md` | 6 bounded contexts with entity ownership and frontend module mapping | @architect                          |
| `architecture/api-contracts.md`    | Endpoint contracts consumed by frontend                              | @planner, @reviewer, @documentation |
| `product/vision.md`                | Product vision, audience, 5 key principles                           | @architect                          |

### How to Load Shared Context via MCP GitHub

Use the GitHub MCP server to read files directly from the shared repo (no clone needed):

```
# Load glossary (most frequently needed)
→ Use MCP GitHub to read `business/glossary.md` from satryawiguna/satryawiguna-shared

# Load business rules before planning
→ Use MCP GitHub to read `business/business-rules.md` from satryawiguna/satryawiguna-shared

# Load bounded contexts when architecting
→ Use MCP GitHub to read `architecture/bounded-contexts.md` from satryawiguna/satryawiguna-shared

# Load API contracts when reviewing endpoint changes
→ Use MCP GitHub to read `architecture/api-contracts.md` from satryawiguna/satryawiguna-shared

# Load product vision for strategic decisions
→ Use MCP GitHub to read `product/vision.md` from satryawiguna/satryawiguna-shared
```
