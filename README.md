# Satryawiguna Monorepo

A modern Next.js monorepo with clean architecture, built with Turborepo, pnpm, and TypeScript.

## 🏗️ Project Structure

```
.
├── apps/
│   ├── admin/          # Admin dashboard application
│   └── web/            # Public web application
├── packages/
│   ├── ui/             # Shared UI components (including Formik components)
│   └── utils/          # Shared utilities and helpers
└── shared/
    ├── types/          # Shared TypeScript types
    ├── api/            # API client and services
    ├── store/          # Redux store configuration
    └── constants/      # Shared constants and validation rules
```

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI)
- **Form Management**: Formik + Yup
- **State Management**: Redux Toolkit + React Query
- **API Client**: Axios
- **Monorepo**: Turborepo + pnpm workspaces

## 📦 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev

# Build all apps
pnpm build

# Run linting
pnpm lint
```

### Development

```bash
# Run admin app only
pnpm --filter admin dev

# Run web app only
pnpm --filter web dev
```

## 📁 Clean Architecture

Each application follows clean architecture principles:

- **Presentation Layer**: Components, pages, layouts, forms
- **Domain Layer**: Business logic, entities, use cases
- **Data Layer**: API services, repositories
- **Infrastructure**: External services, utilities

## 📋 Features

✅ **Clean Architecture** - Organized by layers (presentation, domain, data, infrastructure)  
✅ **Type Safety** - Full TypeScript support with shared types  
✅ **Form Validation** - Formik + Yup with pre-built validation schemas  
✅ **Shared Constants** - Centralized constants and validation rules  
✅ **Modern Stack** - Latest Next.js, React, and MUI  
✅ **State Management** - Redux + React Query  
✅ **Code Sharing** - Shared components, utilities, and types  
✅ **Fast Builds** - Turborepo for optimized builds

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [STRUCTURE.md](STRUCTURE.md) - Complete project structure
- [FORMIK_GUIDE.md](FORMIK_GUIDE.md) - Form validation guide

## 🎯 Example Pages

### Admin App (http://localhost:3001)

- `/` - Dashboard home
- `/login` - Login form with validation
- `/register` - Registration form with validation

### Web App (http://localhost:3000)

- `/` - Landing page
- `/contact` - Contact form with validation

## 🎨 Code Style

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Consistent naming conventions

## 📄 License

MIT
