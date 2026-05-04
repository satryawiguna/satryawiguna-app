# Formik & Form Validation Guide

This guide explains how to use Formik and Yup for form handling and validation in the monorepo.

## 📦 Packages Involved

- **formik**: Form state management
- **yup**: Schema-based validation
- **ui**: Shared Formik components and validation schemas
- **shared-constants**: Validation rules and messages

## 🎯 Quick Start

### 1. Basic Form Example

```tsx
import { Formik, Form } from 'formik';
import { FormikTextField, loginFormSchema } from 'ui';
import { Button } from '@mui/material';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    console.log('Form values:', values);
    // Handle form submission
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <FormikTextField
            name="email"
            label="Email"
            type="email"
          />
          
          <FormikTextField
            name="password"
            label="Password"
            type="password"
          />
          
          <Button
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
```

## 🧩 Available Components

### FormikTextField

Text input field with automatic error handling.

```tsx
import { FormikTextField } from 'ui';

<FormikTextField
  name="email"
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  helperText="We'll never share your email"
/>
```

### FormikCheckbox

Checkbox with validation support.

```tsx
import { FormikCheckbox } from 'ui';

<FormikCheckbox
  name="acceptTerms"
  label="I accept the terms and conditions"
/>
```

### FormikSelect

Dropdown select with options.

```tsx
import { FormikSelect } from 'ui';

const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

<FormikSelect
  name="role"
  label="Role"
  options={options}
/>
```

## ✅ Validation Schemas

Pre-built validation schemas are available in the `ui` package.

### Field-Level Schemas

```tsx
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  usernameSchema,
  phoneSchema,
  urlSchema,
} from 'ui';
```

### Form-Level Schemas

```tsx
import {
  loginFormSchema,
  registerFormSchema,
  contactFormSchema,
  profileUpdateFormSchema,
  changePasswordFormSchema,
} from 'ui';
```

### Example Usage

```tsx
import * as Yup from 'yup';
import { emailSchema, passwordSchema } from 'ui';

// Use pre-built schemas
const loginSchema = Yup.object({
  email: emailSchema,
  password: passwordSchema,
});

// Or use the complete form schema
import { loginFormSchema } from 'ui';

<Formik
  validationSchema={loginFormSchema}
  // ...
>
```

## 🎨 Custom Validation Schema

Create your own validation schema using Yup and shared constants:

```tsx
import * as Yup from 'yup';
import { VALIDATION, VALIDATION_MESSAGES } from 'shared-constants';

const customFormSchema = Yup.object({
  username: Yup.string()
    .min(VALIDATION.USERNAME.MIN_LENGTH, 
      VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.USERNAME.MIN_LENGTH))
    .matches(VALIDATION.USERNAME.PATTERN, 
      VALIDATION_MESSAGES.INVALID_USERNAME)
    .required(VALIDATION_MESSAGES.REQUIRED),
  
  age: Yup.number()
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Must be less than 100 years old')
    .required(VALIDATION_MESSAGES.REQUIRED),
});
```

## 📋 Complete Form Examples

### Login Form

```tsx
import { Formik, Form } from 'formik';
import { FormikTextField, loginFormSchema } from 'ui';
import { Button, Box } from '@mui/material';

export function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormikTextField name="email" label="Email" type="email" />
            <FormikTextField name="password" label="Password" type="password" />
            <Button type="submit" disabled={isSubmitting}>Login</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
```

### Register Form

```tsx
import { Formik, Form } from 'formik';
import { FormikTextField, FormikCheckbox, registerFormSchema } from 'ui';

export function RegisterForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      }}
      validationSchema={registerFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormikTextField name="name" label="Full Name" />
          <FormikTextField name="email" label="Email" type="email" />
          <FormikTextField name="password" label="Password" type="password" />
          <FormikTextField name="confirmPassword" label="Confirm Password" type="password" />
          <FormikCheckbox name="acceptTerms" label="I accept the terms" />
          <Button type="submit" disabled={isSubmitting}>Register</Button>
        </Form>
      )}
    </Formik>
  );
}
```

### Contact Form

```tsx
import { Formik, Form } from 'formik';
import { FormikTextField, contactFormSchema } from 'ui';

export function ContactForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        subject: '',
        message: '',
      }}
      validationSchema={contactFormSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormikTextField name="name" label="Name" />
          <FormikTextField name="email" label="Email" type="email" />
          <FormikTextField name="subject" label="Subject" />
          <FormikTextField 
            name="message" 
            label="Message" 
            multiline 
            rows={4} 
          />
          <Button type="submit" disabled={isSubmitting}>Send</Button>
        </Form>
      )}
    </Formik>
  );
}
```

## 🔍 Validation Constants

All validation rules are centralized in `shared-constants`:

```tsx
import { VALIDATION, VALIDATION_MESSAGES } from 'shared-constants';

// Email validation
VALIDATION.EMAIL.MIN_LENGTH // 5
VALIDATION.EMAIL.MAX_LENGTH // 255
VALIDATION.EMAIL.PATTERN // Regex pattern

// Password validation
VALIDATION.PASSWORD.MIN_LENGTH // 8
VALIDATION.PASSWORD.PATTERN // Must include uppercase, lowercase, number

// Validation messages
VALIDATION_MESSAGES.REQUIRED // "This field is required"
VALIDATION_MESSAGES.INVALID_EMAIL // "Please enter a valid email address"
VALIDATION_MESSAGES.MIN_LENGTH(8) // "Must be at least 8 characters"
```

## 🎯 Best Practices

### 1. Use Type-Safe Forms

```tsx
interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const handleSubmit = (values: FormValues) => {
  // TypeScript knows the shape of values
};
```

### 2. Handle Loading States

```tsx
<Formik onSubmit={handleSubmit}>
  {({ isSubmitting, isValid, dirty }) => (
    <Form>
      {/* ... */}
      <Button 
        type="submit" 
        disabled={isSubmitting || !isValid || !dirty}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  )}
</Formik>
```

### 3. Show Success/Error Messages

```tsx
const [status, setStatus] = useState<'success' | 'error' | null>(null);

const handleSubmit = async (values: FormValues) => {
  try {
    await api.submit(values);
    setStatus('success');
  } catch (error) {
    setStatus('error');
  }
};

return (
  <>
    {status === 'success' && <Alert severity="success">Success!</Alert>}
    {status === 'error' && <Alert severity="error">Error!</Alert>}
    <Formik onSubmit={handleSubmit}>...</Formik>
  </>
);
```

### 4. Reset Form After Submit

```tsx
<Formik
  onSubmit={async (values, { resetForm }) => {
    await api.submit(values);
    resetForm(); // Clear the form
  }}
>
```

### 5. Use Helper Text

```tsx
<FormikTextField
  name="password"
  label="Password"
  type="password"
  helperText="Must be at least 8 characters with uppercase, lowercase, and number"
/>
```

## 🚀 Advanced Usage

### Dynamic Validation

```tsx
const schema = Yup.object({
  email: emailSchema,
  password: Yup.string().when('email', {
    is: (email: string) => email.includes('@admin.com'),
    then: (schema) => schema.min(12, 'Admin passwords must be 12+ chars'),
    otherwise: (schema) => schema.min(8, 'Password must be 8+ chars'),
  }),
});
```

### Field Arrays

```tsx
import { FieldArray } from 'formik';

<FieldArray name="tags">
  {({ push, remove }) => (
    <>
      {values.tags.map((tag, index) => (
        <FormikTextField
          key={index}
          name={`tags.${index}`}
          label={`Tag ${index + 1}`}
        />
      ))}
      <Button onClick={() => push('')}>Add Tag</Button>
    </>
  )}
</FieldArray>
```

### Conditional Fields

```tsx
{values.hasPhone && (
  <FormikTextField
    name="phone"
    label="Phone Number"
    type="tel"
  />
)}
```

## 📚 Resources

- [Formik Documentation](https://formik.org/docs/overview)
- [Yup Documentation](https://github.com/jquense/yup)
- [MUI + Formik](https://formik.org/docs/examples/with-material-ui)

## 🎉 Example Pages

The following example pages demonstrate Formik integration:

### Admin App
- `/login` - Login form
- `/register` - Registration form

### Web App
- `/contact` - Contact form

Visit these pages after running the development server to see working examples!
