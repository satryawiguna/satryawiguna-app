# UI Package

Shared UI components built with Material-UI and Formik integration.

## Usage

### Basic Components

```tsx
import { Button, Card, Loading } from 'ui';

function MyComponent() {
  return (
    <Card>
      <Button variant="contained">Click me</Button>
      <Loading />
    </Card>
  );
}
```

### Formik Components

```tsx
import { FormikTextField, FormikCheckbox, FormikSelect } from 'ui';
import { Formik, Form } from 'formik';

function MyForm() {
  return (
    <Formik
      initialValues={{ email: '', role: '', terms: false }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <FormikTextField name="email" label="Email" type="email" />

        <FormikSelect
          name="role"
          label="Role"
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },
          ]}
        />

        <FormikCheckbox name="terms" label="Accept terms" />
      </Form>
    </Formik>
  );
}
```

### Validation Schemas

```tsx
import {
  loginFormSchema,
  registerFormSchema,
  contactFormSchema,
  emailSchema,
  passwordSchema,
} from 'ui';
import { Formik } from 'formik';

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      {/* form fields */}
    </Formik>
  );
}
```

## Available Schemas

### Form Schemas

- `loginFormSchema` - Email + password
- `registerFormSchema` - Name, email, password, confirm password, terms
- `contactFormSchema` - Name, email, subject, message
- `profileUpdateFormSchema` - Profile fields
- `changePasswordFormSchema` - Current, new, confirm password
- `forgotPasswordFormSchema` - Email only
- `resetPasswordFormSchema` - New password + confirm

### Field Schemas

- `emailSchema` - Email validation
- `passwordSchema` - Strong password (8+ chars, uppercase, lowercase, number)
- `nameSchema` - Name (2-100 chars)
- `usernameSchema` - Username (3-50 chars, alphanumeric)
- `phoneSchema` - Phone number
- `urlSchema` - URL validation
- `termsSchema` - Checkbox validation

## Components

- `Button` - MUI Button wrapper
- `Card` - MUI Card wrapper
- `Loading` - Loading spinner
- `FormikTextField` - Text input with Formik
- `FormikCheckbox` - Checkbox with Formik
- `FormikSelect` - Select dropdown with Formik

## Documentation

See [FORMIK_GUIDE.md](../../FORMIK_GUIDE.md) for detailed form validation guide.
