import { TextField, TextFieldProps } from '@mui/material';
import { useField, FieldHookConfig } from 'formik';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

/**
 * TextField component integrated with Formik
 * Automatically handles form state, validation, and error display
 */
export function FormikTextField({ name, ...props }: FormikTextFieldProps) {
  const [field, meta] = useField(name);

  const showError = meta.touched && Boolean(meta.error);

  return (
    <TextField
      {...field}
      {...props}
      error={showError}
      helperText={showError ? meta.error : props.helperText}
      fullWidth
    />
  );
}
