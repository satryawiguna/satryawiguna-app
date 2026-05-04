# Quick Start Guide

Get your Next.js monorepo up and running in minutes!

## 🚀 Installation

### 1. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 2. Install dependencies

```bash
pnpm install
```

This will install all dependencies for all apps and packages.

### 3. Set up environment variables

**Admin App:**

```bash
cd apps/admin
cp .env.example .env.local
```

**Web App:**

```bash
cd apps/web
cp .env.example .env.local
```

Edit the `.env.local` files if needed to configure your API URLs.

### 4. Start development servers

```bash
# From the root directory
pnpm dev
```

This will start both applications:

- 🎨 Admin Dashboard: http://localhost:3001
- 🌐 Web App: http://localhost:3000

## 🎯 What You Get

### Two Next.js Applications

#### Admin Dashboard (Port 3001)

- Material-UI components
- Dashboard layout
- Redux state management
- React Query for data fetching
- Tailwind CSS styling
- Clean architecture structure

#### Public Website (Port 3000)

- Material-UI components
- Blog and portfolio ready
- Redux state management
- React Query for data fetching
- Tailwind CSS styling
- Clean architecture structure

### Shared Packages

- **ui**: Reusable UI components
- **utils**: Utility functions
- **shared-types**: TypeScript types
- **shared-api**: Axios API client
- **shared-store**: Redux store

## 📝 Development Workflow

### Run specific app

```bash
# Admin only
pnpm --filter admin dev

# Web only
pnpm --filter web dev
```

### Build for production

```bash
pnpm build
```

### Start production build

```bash
pnpm start
```

### Lint code

```bash
pnpm lint
```

### Format code

```bash
pnpm format
```

## 🏗️ Project Structure Overview

```
satryawiguna.me/
├── apps/
│   ├── admin/          # Admin dashboard
│   └── web/            # Public website
├── packages/
│   ├── ui/             # Shared components
│   └── utils/          # Utilities
└── shared/
    ├── types/          # TypeScript types
    ├── api/            # API client
    └── store/          # Redux store
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Material-UI (MUI) + Tailwind CSS
- **State**: Redux Toolkit + React Query
- **API**: Axios
- **Monorepo**: Turborepo + pnpm

## 📚 Next Steps

1. **Read the documentation**
   - [SETUP.md](SETUP.md) - Detailed setup guide
   - [STRUCTURE.md](STRUCTURE.md) - Project structure
   - [README.md](README.md) - Project overview

2. **Explore the code**
   - Check out the example components
   - Review the clean architecture structure
   - Examine the shared packages

3. **Start building**
   - Add new components
   - Create new pages
   - Implement your features

## 🔧 Common Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                    # Start all apps
pnpm --filter admin dev     # Admin only
pnpm --filter web dev       # Web only

# Build
pnpm build                  # Build all apps
pnpm --filter admin build   # Build admin

# Production
pnpm start                  # Start all apps
pnpm --filter admin start   # Start admin

# Maintenance
pnpm clean                  # Clean build artifacts
pnpm lint                   # Lint all code
pnpm format                 # Format with Prettier

# Add packages
pnpm --filter admin add <package>
pnpm --filter shared-api add <package>
pnpm add -D -w <package>    # Root dev dependency
```

## 🎨 Features

✅ **Clean Architecture** - Organized by layers (presentation, domain, data, infrastructure)  
✅ **Type Safety** - Full TypeScript support with shared types  
✅ **Modern Stack** - Latest Next.js, React, and MUI  
✅ **State Management** - Redux + React Query  
✅ **Code Sharing** - Shared components, utilities, and types  
✅ **Fast Builds** - Turborepo for optimized builds  
✅ **Developer Experience** - Hot reload, linting, formatting

## 💡 Tips

- Use path aliases (`@/components`, `@/hooks`, etc.) for cleaner imports
- Keep business logic in the domain layer
- Use repositories for data access
- Create custom hooks for data fetching
- Add types to `shared/types` for reusability

## 🆘 Troubleshooting

**Port already in use?**

```bash
# Change port in apps/*/package.json
"dev": "next dev --port 3002"
```

**Module not found?**

```bash
pnpm install
```

**Build errors?**

```bash
pnpm clean
pnpm install
pnpm build
```

## 🎉 You're Ready!

Your Next.js monorepo with clean architecture is all set up. Happy coding! 🚀

For more detailed information, check out:

- [SETUP.md](SETUP.md) - Complete setup guide
- [STRUCTURE.md](STRUCTURE.md) - Detailed project structure
- [README.md](README.md) - Project documentation
