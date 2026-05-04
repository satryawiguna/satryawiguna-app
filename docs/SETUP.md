# Getting Started

This guide will help you set up and run the project.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (Install with: `npm install -g pnpm`)

## Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   For Admin app:

   ```bash
   cd apps/admin
   cp .env.example .env.local
   ```

   For Web app:

   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

## Development

### Run all apps

```bash
pnpm dev
```

This will start:

- Admin app at http://localhost:3001
- Web app at http://localhost:3000

### Run specific app

```bash
# Admin only
pnpm --filter admin dev

# Web only
pnpm --filter web dev
```

## Building

### Build all apps

```bash
pnpm build
```

### Build specific app

```bash
pnpm --filter admin build
pnpm --filter web build
```

## Production

### Start production servers

```bash
pnpm build
pnpm start
```

## Project Structure

```
.
├── apps/
│   ├── admin/                  # Admin dashboard (port 3001)
│   │   └── src/
│   │       ├── app/           # Next.js app directory
│   │       ├── presentation/  # UI components, hooks, theme
│   │       ├── domain/        # Business logic, entities, use cases
│   │       ├── data/          # Repositories, data sources
│   │       └── infrastructure/# Utils, config, external services
│   └── web/                   # Public website (port 3000)
│       └── src/
│           ├── app/           # Next.js app directory
│           ├── presentation/  # UI components, hooks, theme
│           ├── domain/        # Business logic, entities, use cases
│           ├── data/          # Repositories, data sources
│           └── infrastructure/# Utils, config, external services
├── packages/
│   ├── ui/                    # Shared UI components
│   └── utils/                 # Shared utilities
└── shared/
    ├── types/                 # Shared TypeScript types
    ├── api/                   # API client (Axios)
    └── store/                 # Redux store
```

## Clean Architecture Layers

### 1. Presentation Layer (`presentation/`)

- UI components
- React hooks
- Theme configuration
- State management integration

### 2. Domain Layer (`domain/`)

- Business entities
- Use cases (business logic)
- Domain interfaces

### 3. Data Layer (`data/`)

- Repositories (data access)
- API service implementations
- Data transformations

### 4. Infrastructure Layer (`infrastructure/`)

- Utilities
- Configuration
- External service integrations
- Logging

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit + React Query
- **API Client**: Axios
- **Monorepo**: Turborepo + pnpm workspaces

## Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps
- `pnpm start` - Start production servers
- `pnpm lint` - Lint all code
- `pnpm clean` - Clean build artifacts
- `pnpm format` - Format code with Prettier

## Adding New Packages

### Add to specific app

```bash
pnpm --filter admin add <package-name>
pnpm --filter web add <package-name>
```

### Add to shared package

```bash
pnpm --filter shared-api add <package-name>
pnpm --filter shared-store add <package-name>
```

### Add to root (dev dependencies)

```bash
pnpm add -D -w <package-name>
```

## Code Style

- Use TypeScript for type safety
- Follow clean architecture principles
- Use functional components and hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for complex logic
- Use absolute imports with path aliases

## Path Aliases

Both apps support these path aliases:

- `@/*` - Any file in src
- `@/components/*` - Presentation components
- `@/hooks/*` - Custom hooks
- `@/services/*` - Data services
- `@/repositories/*` - Data repositories
- `@/entities/*` - Domain entities
- `@/usecases/*` - Domain use cases
- `@/utils/*` - Infrastructure utilities

## Best Practices

1. **Component Organization**
   - Keep components in `presentation/components/`
   - Group related components in folders
   - Export from index files

2. **State Management**
   - Use React Query for server state
   - Use Redux for global client state
   - Use local state for component-specific state

3. **API Integration**
   - Create repositories in `data/repositories/`
   - Use the shared API client from `shared-api`
   - Create custom hooks for data fetching

4. **Type Safety**
   - Define types in `shared/types/`
   - Use strict TypeScript settings
   - Avoid `any` type

## Troubleshooting

### Port already in use

If ports 3000 or 3001 are already in use, you can change them in the package.json scripts:

```json
"dev": "next dev --port 3002"
```

### Module not found

If you see module not found errors, try:

```bash
pnpm install
```

### Build errors

Clean and rebuild:

```bash
pnpm clean
pnpm install
pnpm build
```

## Support

For issues or questions, please check:

- Project README
- Package-specific READMEs
- Next.js documentation
- MUI documentation
