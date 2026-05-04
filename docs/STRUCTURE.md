# Project Structure

This document provides a complete overview of the monorepo structure.

## Directory Tree

```
satryawiguna.me/
│
├── apps/                           # Applications
│   ├── admin/                      # Admin Dashboard (http://localhost:3001)
│   │   ├── src/
│   │   │   ├── app/               # Next.js App Router
│   │   │   │   ├── layout.tsx     # Root layout with providers
│   │   │   │   ├── page.tsx       # Home page
│   │   │   │   └── globals.css    # Global styles
│   │   │   │
│   │   │   ├── presentation/      # Presentation Layer
│   │   │   │   ├── components/
│   │   │   │   │   └── providers/
│   │   │   │   │       └── Providers.tsx  # Redux + React Query providers
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useDashboard.ts    # Dashboard hooks
│   │   │   │   │   └── index.ts
│   │   │   │   └── theme/
│   │   │   │       └── index.ts           # MUI theme configuration
│   │   │   │
│   │   │   ├── domain/            # Domain Layer (Business Logic)
│   │   │   │   ├── entities/
│   │   │   │   │   └── index.ts           # Domain entities
│   │   │   │   └── usecases/
│   │   │   │       ├── getDashboardStats.ts
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   ├── data/              # Data Layer (Data Access)
│   │   │   │   └── repositories/
│   │   │   │       ├── dashboardRepository.ts
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   └── infrastructure/    # Infrastructure Layer
│   │   │       ├── config/
│   │   │       │   ├── constants.ts
│   │   │       │   └── index.ts
│   │   │       └── utils/
│   │   │           ├── logger.ts
│   │   │           └── index.ts
│   │   │
│   │   ├── .env.example           # Environment variables template
│   │   ├── .eslintrc.json         # ESLint configuration
│   │   ├── next.config.ts         # Next.js configuration
│   │   ├── package.json           # Dependencies
│   │   ├── postcss.config.mjs     # PostCSS configuration
│   │   ├── tailwind.config.ts     # Tailwind configuration
│   │   ├── tsconfig.json          # TypeScript configuration
│   │   └── README.md              # Admin app documentation
│   │
│   └── web/                       # Public Website (http://localhost:3000)
│       ├── src/
│       │   ├── app/               # Next.js App Router
│       │   │   ├── layout.tsx     # Root layout with providers
│       │   │   ├── page.tsx       # Home page
│       │   │   └── globals.css    # Global styles
│       │   │
│       │   ├── presentation/      # Presentation Layer
│       │   │   ├── components/
│       │   │   │   └── providers/
│       │   │   │       └── Providers.tsx  # Redux + React Query providers
│       │   │   ├── hooks/
│       │   │   │   ├── useBlog.ts         # Blog hooks
│       │   │   │   ├── useProjects.ts     # Project hooks
│       │   │   │   └── index.ts
│       │   │   └── theme/
│       │   │       └── index.ts           # MUI theme configuration
│       │   │
│       │   ├── domain/            # Domain Layer (Business Logic)
│       │   │   ├── entities/
│       │   │   │   └── index.ts           # BlogPost, Project entities
│       │   │   └── usecases/
│       │   │       ├── getPublishedPosts.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── data/              # Data Layer (Data Access)
│       │   │   └── repositories/
│       │   │       ├── blogRepository.ts
│       │   │       ├── projectRepository.ts
│       │   │       └── index.ts
│       │   │
│       │   └── infrastructure/    # Infrastructure Layer
│       │       ├── config/
│       │       │   ├── constants.ts
│       │       │   └── index.ts
│       │       └── utils/
│       │           ├── logger.ts
│       │           └── index.ts
│       │
│       ├── .env.example           # Environment variables template
│       ├── .eslintrc.json         # ESLint configuration
│       ├── next.config.ts         # Next.js configuration
│       ├── package.json           # Dependencies
│       ├── postcss.config.mjs     # PostCSS configuration
│       ├── tailwind.config.ts     # Tailwind configuration
│       ├── tsconfig.json          # TypeScript configuration
│       └── README.md              # Web app documentation
│
├── packages/                      # Shared Packages
│   ├── ui/                        # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Loading.tsx
│   │   │   ├── utils/
│   │   │   │   └── index.ts
│   │   │   └── index.ts           # Package exports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── utils/                     # Shared Utilities
│       ├── src/
│       │   ├── format.ts          # Formatting functions
│       │   ├── validation.ts      # Validation functions
│       │   ├── storage.ts         # Storage utilities
│       │   └── index.ts           # Package exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── shared/                        # Shared Code
│   ├── types/                     # Shared TypeScript Types
│   │   ├── src/
│   │   │   ├── common.ts          # Common types (BaseEntity, Pagination, etc.)
│   │   │   ├── api.ts             # API types
│   │   │   ├── entities/
│   │   │   │   └── user.ts        # User entity types
│   │   │   └── index.ts           # Package exports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── api/                       # API Client (Axios)
│   │   ├── src/
│   │   │   ├── client.ts          # API client class
│   │   │   ├── services/
│   │   │   │   └── userService.ts # User service
│   │   │   ├── interceptors/
│   │   │   │   └── index.ts       # Request/response interceptors
│   │   │   └── index.ts           # Package exports
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── store/                     # Redux Store
│       ├── src/
│       │   ├── store.ts           # Store configuration
│       │   ├── slices/
│       │   │   ├── authSlice.ts   # Auth state
│       │   │   └── userSlice.ts   # User state
│       │   ├── hooks.ts           # Typed Redux hooks
│       │   └── index.ts           # Package exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── .gitignore                     # Git ignore rules
├── .npmrc                         # NPM configuration
├── .prettierrc                    # Prettier configuration
├── package.json                   # Root package.json
├── pnpm-workspace.yaml            # pnpm workspace configuration
├── turbo.json                     # Turborepo configuration
├── tsconfig.json                  # Base TypeScript configuration
├── README.md                      # Project documentation
├── SETUP.md                       # Setup guide
└── STRUCTURE.md                   # This file
```

## Clean Architecture Layers

### 📱 Presentation Layer

**Location**: `src/presentation/`

Responsible for:

- UI components (React components)
- Custom hooks for data fetching
- Theme configuration
- Provider setup

Examples:

- `presentation/components/` - React components
- `presentation/hooks/` - Custom hooks (useBlog, useProjects, etc.)
- `presentation/theme/` - MUI theme configuration

### 🎯 Domain Layer

**Location**: `src/domain/`

Responsible for:

- Business entities (data models)
- Use cases (business logic)
- Domain interfaces

Examples:

- `domain/entities/` - BlogPost, Project, DashboardStats
- `domain/usecases/` - getPublishedPosts, getDashboardStats

### 💾 Data Layer

**Location**: `src/data/`

Responsible for:

- Data access (repositories)
- API service implementations
- Data transformations

Examples:

- `data/repositories/` - blogRepository, projectRepository
- Implements data fetching from APIs
- Transforms raw data to domain entities

### 🔧 Infrastructure Layer

**Location**: `src/infrastructure/`

Responsible for:

- Utilities
- Configuration
- External services
- Logging

Examples:

- `infrastructure/config/` - Constants, environment variables
- `infrastructure/utils/` - Logger, helpers

## Package Dependencies

### Workspace Dependencies

```
apps/admin → ui, shared-types, shared-api, shared-store
apps/web → ui, shared-types, shared-api, shared-store
shared/api → shared-types
shared/store → shared-types
```

### External Dependencies

#### Next.js & React

- `next@^15.0.0`
- `react@^19.0.0`
- `react-dom@^19.0.0`

#### UI & Styling

- `@mui/material@^5.15.20`
- `@mui/icons-material@^5.15.20`
- `@emotion/react@^11.11.4`
- `@emotion/styled@^11.11.5`
- `tailwindcss@^3.4.4`

#### State Management

- `@reduxjs/toolkit@^2.2.5`
- `react-redux@^9.1.2`
- `@tanstack/react-query@^5.45.0`

#### API Client

- `axios@^1.7.2`

#### Build Tools

- `typescript@^5.4.5`
- `turbo@^2.0.0`

## Path Aliases

Both apps use these path aliases (configured in tsconfig.json):

```typescript
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/presentation/components/*"],
  "@/hooks/*": ["./src/presentation/hooks/*"],
  "@/services/*": ["./src/data/services/*"],
  "@/repositories/*": ["./src/data/repositories/*"],
  "@/entities/*": ["./src/domain/entities/*"],
  "@/usecases/*": ["./src/domain/usecases/*"],
  "@/utils/*": ["./src/infrastructure/utils/*"]
}
```

## Data Flow

### Typical Request Flow

```
User Action
    ↓
Component (Presentation)
    ↓
Custom Hook (Presentation)
    ↓
Repository (Data)
    ↓
API Client (Shared)
    ↓
Backend API
```

### Example: Fetching Blog Posts

```
1. User visits blog page
2. Component uses `useBlogPosts()` hook
3. Hook calls `blogRepository.getPosts()`
4. Repository uses `apiClient.get('/blog')`
5. API client makes HTTP request
6. Response transforms to BlogPost entities
7. React Query caches the result
8. Component renders the data
```

## Key Features

### ✅ Type Safety

- Full TypeScript support
- Shared types across apps
- Strict type checking

### ✅ Code Reusability

- Shared UI components
- Shared utilities
- Shared API client
- Shared state management

### ✅ Performance

- Optimized builds with Turborepo
- React Query caching
- Code splitting
- Lazy loading

### ✅ Developer Experience

- Hot module replacement
- ESLint & Prettier
- Path aliases
- Consistent structure

### ✅ Scalability

- Monorepo architecture
- Clean architecture
- Separation of concerns
- Easy to add new apps/packages

## Adding New Features

### New Component

```typescript
// apps/web/src/presentation/components/MyComponent.tsx
import { Box, Typography } from '@mui/material';

export function MyComponent() {
  return (
    <Box>
      <Typography>Hello World</Typography>
    </Box>
  );
}
```

### New Repository

```typescript
// apps/web/src/data/repositories/myRepository.ts
import { apiClient } from 'shared-api';

export class MyRepository {
  private readonly basePath = '/my-endpoint';

  async getData(): Promise<any> {
    return apiClient.get(this.basePath);
  }
}

export const myRepository = new MyRepository();
```

### New Hook

```typescript
// apps/web/src/presentation/hooks/useMyData.ts
import { useQuery } from '@tanstack/react-query';
import { myRepository } from '@/repositories';

export const useMyData = () => {
  return useQuery({
    queryKey: ['myData'],
    queryFn: () => myRepository.getData(),
  });
};
```

### New Entity

```typescript
// shared/types/src/entities/myEntity.ts
import { BaseEntity } from '../common';

export interface MyEntity extends BaseEntity {
  name: string;
  description: string;
}
```

## Best Practices

1. **Keep layers separated** - Don't import from presentation in domain
2. **Use repositories** - Don't call API directly from components
3. **Create custom hooks** - Wrap React Query in custom hooks
4. **Define types** - Add types to shared/types
5. **Use path aliases** - Import with @ instead of relative paths
6. **Export from index** - Use barrel exports for cleaner imports
7. **Document complex logic** - Add JSDoc comments
8. **Test your code** - Write tests for critical functionality

## Maintenance

### Adding Dependencies

```bash
# To app
pnpm --filter admin add <package>

# To shared package
pnpm --filter shared-api add <package>

# Dev dependency to root
pnpm add -D -w <package>
```

### Updating Dependencies

```bash
pnpm update
```

### Cleaning Build Artifacts

```bash
pnpm clean
```
