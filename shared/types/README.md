# Shared Types

TypeScript types and interfaces shared across all applications.

## Usage

```tsx
import { User, UserRole, ApiResponse } from 'shared-types';

const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  role: UserRole.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
```
