# Shared Store

Redux store configuration with Redux Toolkit.

## Usage

```tsx
import { store, useAppDispatch, useAppSelector } from 'shared-store';
import { loginSuccess, selectIsAuthenticated } from 'shared-store';

function LoginComponent() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogin = () => {
    dispatch(loginSuccess({ token: 'xxx', refreshToken: 'yyy' }));
  };

  return <div>{isAuthenticated ? 'Logged in' : 'Not logged in'}</div>;
}
```

## Slices

- **auth**: Authentication state
- **user**: User profile state
