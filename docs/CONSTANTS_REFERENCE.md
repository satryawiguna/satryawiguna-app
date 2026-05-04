# Constants & Validation Quick Reference

Quick reference for using shared constants and validation in your forms.

## 📦 Import Constants

```tsx
import { 
  API_CONFIG, 
  API_ENDPOINTS,
  VALIDATION,
  VALIDATION_MESSAGES,
  HTTP_STATUS,
  STORAGE_KEYS,
  ROUTES,
  USER_ROLES,
  PAGINATION
} from 'shared-constants';
```

## 🌐 API Configuration

```tsx
// Base configuration
API_CONFIG.BASE_URL          // "http://localhost:8000/api"
API_CONFIG.TIMEOUT           // 30000
API_CONFIG.RETRY_ATTEMPTS    // 3

// Endpoints
API_ENDPOINTS.AUTH.LOGIN              // "/auth/login"
API_ENDPOINTS.AUTH.REGISTER           // "/auth/register"
API_ENDPOINTS.USERS.ME                // "/users/me"
API_ENDPOINTS.USERS.BY_ID('123')      // "/users/123"
API_ENDPOINTS.BLOG.BY_SLUG('hello')   // "/blog/hello"
API_ENDPOINTS.PROJECTS.FEATURED       // "/projects/featured"
```

## ✅ Validation Rules

### Email
```tsx
VALIDATION.EMAIL.MIN_LENGTH    // 5
VALIDATION.EMAIL.MAX_LENGTH    // 255
VALIDATION.EMAIL.PATTERN       // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Password
```tsx
VALIDATION.PASSWORD.MIN_LENGTH    // 8
VALIDATION.PASSWORD.MAX_LENGTH    // 128
VALIDATION.PASSWORD.PATTERN       // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
```

### Username
```tsx
VALIDATION.USERNAME.MIN_LENGTH    // 3
VALIDATION.USERNAME.MAX_LENGTH    // 50
VALIDATION.USERNAME.PATTERN       // /^[a-zA-Z0-9_-]+$/
```

### Name
```tsx
VALIDATION.NAME.MIN_LENGTH    // 2
VALIDATION.NAME.MAX_LENGTH    // 100
```

### Phone
```tsx
VALIDATION.PHONE.MIN_LENGTH    // 10
VALIDATION.PHONE.MAX_LENGTH    // 15
VALIDATION.PHONE.PATTERN       // /^\+?[\d\s-()]+$/
```

### URL
```tsx
VALIDATION.URL.PATTERN    // URL regex pattern
```

## 💬 Validation Messages

```tsx
VALIDATION_MESSAGES.REQUIRED                    // "This field is required"
VALIDATION_MESSAGES.INVALID_EMAIL               // "Please enter a valid email address"
VALIDATION_MESSAGES.INVALID_PASSWORD            // "Password must be at least 8 characters..."
VALIDATION_MESSAGES.INVALID_USERNAME            // "Username can only contain..."
VALIDATION_MESSAGES.INVALID_PHONE               // "Please enter a valid phone number"
VALIDATION_MESSAGES.INVALID_URL                 // "Please enter a valid URL"
VALIDATION_MESSAGES.MIN_LENGTH(8)               // "Must be at least 8 characters"
VALIDATION_MESSAGES.MAX_LENGTH(100)             // "Must be no more than 100 characters"
VALIDATION_MESSAGES.PASSWORDS_MUST_MATCH        // "Passwords must match"
VALIDATION_MESSAGES.TERMS_REQUIRED              // "You must accept the terms..."
```

## 🔢 HTTP Status Codes

```tsx
HTTP_STATUS.OK                      // 200
HTTP_STATUS.CREATED                 // 201
HTTP_STATUS.BAD_REQUEST             // 400
HTTP_STATUS.UNAUTHORIZED            // 401
HTTP_STATUS.FORBIDDEN               // 403
HTTP_STATUS.NOT_FOUND               // 404
HTTP_STATUS.INTERNAL_SERVER_ERROR   // 500
```

## 📝 HTTP Methods

```tsx
HTTP_METHODS.GET       // "GET"
HTTP_METHODS.POST      // "POST"
HTTP_METHODS.PUT       // "PUT"
HTTP_METHODS.PATCH     // "PATCH"
HTTP_METHODS.DELETE    // "DELETE"
```

## 💾 Storage Keys

```tsx
STORAGE_KEYS.AUTH_TOKEN         // "authToken"
STORAGE_KEYS.REFRESH_TOKEN      // "refreshToken"
STORAGE_KEYS.USER_PREFERENCES   // "userPreferences"
STORAGE_KEYS.THEME              // "theme"
STORAGE_KEYS.LANGUAGE           // "language"
```

## 🗺️ Routes

```tsx
ROUTES.HOME         // "/"
ROUTES.LOGIN        // "/login"
ROUTES.REGISTER     // "/register"
ROUTES.DASHBOARD    // "/dashboard"
ROUTES.PROFILE      // "/profile"
ROUTES.SETTINGS     // "/settings"
ROUTES.ABOUT        // "/about"
ROUTES.CONTACT      // "/contact"
ROUTES.BLOG         // "/blog"
ROUTES.PROJECTS     // "/projects"
```

## 👥 User Roles

```tsx
USER_ROLES.ADMIN    // "admin"
USER_ROLES.USER     // "user"
USER_ROLES.GUEST    // "guest"
```

## 📄 Pagination

```tsx
PAGINATION.DEFAULT_PAGE     // 1
PAGINATION.DEFAULT_LIMIT    // 10
PAGINATION.MAX_LIMIT        // 100
PAGINATION.PAGE_SIZES       // [10, 25, 50, 100]
```

## 🎯 Usage Examples

### Validation in Forms

```tsx
import * as Yup from 'yup';
import { VALIDATION, VALIDATION_MESSAGES } from 'shared-constants';

const schema = Yup.object({
  email: Yup.string()
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .min(VALIDATION.EMAIL.MIN_LENGTH, 
      VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.EMAIL.MIN_LENGTH))
    .required(VALIDATION_MESSAGES.REQUIRED),
  
  password: Yup.string()
    .min(VALIDATION.PASSWORD.MIN_LENGTH,
      VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.PASSWORD.MIN_LENGTH))
    .matches(VALIDATION.PASSWORD.PATTERN, 
      VALIDATION_MESSAGES.INVALID_PASSWORD)
    .required(VALIDATION_MESSAGES.REQUIRED),
});
```

### API Calls

```tsx
import { API_ENDPOINTS, HTTP_STATUS } from 'shared-constants';
import { apiClient } from 'shared-api';

async function login(email: string, password: string) {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );
    
    if (response.status === HTTP_STATUS.OK) {
      // Success
    }
  } catch (error) {
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      // Invalid credentials
    }
  }
}
```

### Local Storage

```tsx
import { STORAGE_KEYS } from 'shared-constants';
import { storage } from 'utils';

// Save token
storage.set(STORAGE_KEYS.AUTH_TOKEN, 'your-token');

// Get token
const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);

// Remove token
storage.remove(STORAGE_KEYS.AUTH_TOKEN);
```

### Navigation

```tsx
import { ROUTES } from 'shared-constants';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();
  
  const handleLogin = () => {
    router.push(ROUTES.DASHBOARD);
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

## 📚 See Also

- [shared/constants/README.md](../shared/constants/README.md) - Full constants documentation
- [FORMIK_GUIDE.md](../FORMIK_GUIDE.md) - Form validation guide
