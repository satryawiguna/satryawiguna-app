import * as Yup from 'yup';
import { VALIDATION, VALIDATION_MESSAGES } from 'shared-constants';

/**
 * Common validation schemas using Yup
 */

// Email validation schema
export const emailSchema = Yup.string()
  .email(VALIDATION_MESSAGES.INVALID_EMAIL)
  .min(VALIDATION.EMAIL.MIN_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.EMAIL.MIN_LENGTH))
  .max(VALIDATION.EMAIL.MAX_LENGTH, VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION.EMAIL.MAX_LENGTH))
  .required(VALIDATION_MESSAGES.REQUIRED);

// Password validation schema
export const passwordSchema = Yup.string()
  .min(
    VALIDATION.PASSWORD.MIN_LENGTH,
    VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.PASSWORD.MIN_LENGTH)
  )
  .max(
    VALIDATION.PASSWORD.MAX_LENGTH,
    VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION.PASSWORD.MAX_LENGTH)
  )
  .matches(VALIDATION.PASSWORD.PATTERN, VALIDATION_MESSAGES.INVALID_PASSWORD)
  .required(VALIDATION_MESSAGES.REQUIRED);

// Name validation schema
export const nameSchema = Yup.string()
  .min(VALIDATION.NAME.MIN_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.NAME.MIN_LENGTH))
  .max(VALIDATION.NAME.MAX_LENGTH, VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION.NAME.MAX_LENGTH))
  .required(VALIDATION_MESSAGES.REQUIRED);

// Username validation schema
export const usernameSchema = Yup.string()
  .min(
    VALIDATION.USERNAME.MIN_LENGTH,
    VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.USERNAME.MIN_LENGTH)
  )
  .max(
    VALIDATION.USERNAME.MAX_LENGTH,
    VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION.USERNAME.MAX_LENGTH)
  )
  .matches(VALIDATION.USERNAME.PATTERN, VALIDATION_MESSAGES.INVALID_USERNAME)
  .required(VALIDATION_MESSAGES.REQUIRED);

// Phone validation schema
export const phoneSchema = Yup.string()
  .matches(VALIDATION.PHONE.PATTERN, VALIDATION_MESSAGES.INVALID_PHONE)
  .min(VALIDATION.PHONE.MIN_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION.PHONE.MIN_LENGTH))
  .max(VALIDATION.PHONE.MAX_LENGTH, VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION.PHONE.MAX_LENGTH))
  .required(VALIDATION_MESSAGES.REQUIRED);

// URL validation schema
export const urlSchema = Yup.string()
  .matches(VALIDATION.URL.PATTERN, VALIDATION_MESSAGES.INVALID_URL)
  .required(VALIDATION_MESSAGES.REQUIRED);

// Optional URL validation schema
export const optionalUrlSchema = Yup.string()
  .matches(VALIDATION.URL.PATTERN, VALIDATION_MESSAGES.INVALID_URL)
  .nullable();

// Confirm password validation schema
export const confirmPasswordSchema = (passwordField: string = 'password') =>
  Yup.string()
    .oneOf([Yup.ref(passwordField)], VALIDATION_MESSAGES.PASSWORDS_MUST_MATCH)
    .required(VALIDATION_MESSAGES.REQUIRED);

// Terms acceptance validation schema
export const termsSchema = Yup.boolean()
  .oneOf([true], VALIDATION_MESSAGES.TERMS_REQUIRED)
  .required(VALIDATION_MESSAGES.TERMS_REQUIRED);

/**
 * Common form validation schemas
 */

// Login form schema
export const loginFormSchema = Yup.object({
  email: emailSchema,
  password: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
});

// Register form schema
export const registerFormSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema(),
  acceptTerms: termsSchema,
});

// Forgot password form schema
export const forgotPasswordFormSchema = Yup.object({
  email: emailSchema,
});

// Reset password form schema
export const resetPasswordFormSchema = Yup.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema(),
});

// Contact form schema
export const contactFormSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  subject: Yup.string()
    .min(3, VALIDATION_MESSAGES.MIN_LENGTH(3))
    .max(200, VALIDATION_MESSAGES.MAX_LENGTH(200))
    .required(VALIDATION_MESSAGES.REQUIRED),
  message: Yup.string()
    .min(10, VALIDATION_MESSAGES.MIN_LENGTH(10))
    .max(1000, VALIDATION_MESSAGES.MAX_LENGTH(1000))
    .required(VALIDATION_MESSAGES.REQUIRED),
});

// Profile update schema
export const profileUpdateFormSchema = Yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.nullable(),
  bio: Yup.string().max(500, VALIDATION_MESSAGES.MAX_LENGTH(500)).nullable(),
  website: optionalUrlSchema,
});

// Change password schema
export const changePasswordFormSchema = Yup.object({
  currentPassword: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  newPassword: passwordSchema,
  confirmNewPassword: confirmPasswordSchema('newPassword'),
});
