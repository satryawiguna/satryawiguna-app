# Shared API

API client and services using Axios.

## Usage

```tsx
import { apiClient, userService } from 'shared-api';

// Using the API client directly
const data = await apiClient.get('/endpoint');

// Using a service
const users = await userService.getUsers({ page: 1, limit: 10 });
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Base URL for the API (default: http://localhost:8000/api)
