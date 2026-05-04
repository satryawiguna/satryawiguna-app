# Shared Constants

Centralized constants and configuration values shared across all applications.

## Usage

```typescript
import {
  API_CONFIG,
  API_ENDPOINTS,
  VALIDATION,
  VALIDATION_MESSAGES,
  HTTP_STATUS,
  STORAGE_KEYS,
  ROUTES,
} from 'shared-constants';

// API Configuration
const baseUrl = API_CONFIG.BASE_URL;

// API Endpoints
const loginUrl = API_ENDPOINTS.AUTH.LOGIN;
const userUrl = API_ENDPOINTS.USERS.BY_ID('123');

// Validation
const emailPattern = VALIDATION.EMAIL.PATTERN;
const minPasswordLength = VALIDATION.PASSWORD.MIN_LENGTH;

// Validation Messages
const requiredMsg = VALIDATION_MESSAGES.REQUIRED;
const minLengthMsg = VALIDATION_MESSAGES.MIN_LENGTH(8);

// HTTP Status
if (response.status === HTTP_STATUS.UNAUTHORIZED) {
  // Handle unauthorized
}

// Storage Keys
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

// Routes
router.push(ROUTES.DASHBOARD);
```

## Included Constants

### API Configuration

- Base URL
- Timeout settings
- Retry configuration
- All API endpoints

### App Configuration

- App metadata
- Pagination defaults
- Storage keys
- Date formats
- User roles
- Routes

### Validation

- Email validation rules
- Password requirements
- Username patterns
- Phone number patterns
- URL validation
- Validation messages

### HTTP

- Status codes
- HTTP methods
- Content types

## Benefits

- ✅ Single source of truth
- ✅ Type-safe constants
- ✅ Easy to maintain
- ✅ Consistent across apps
- ✅ Autocomplete support
