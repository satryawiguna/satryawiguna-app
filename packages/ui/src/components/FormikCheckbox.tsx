import { Checkbox, FormControlLabel, FormHelperText, FormControlLabelProps } from '@mui/material';
import { useField } from 'formik';

type FormikCheckboxProps = Omit<FormControlLabelProps, 'control'> & {
  name: string;
  helperText?: string;
};

/**
 * Checkbox component integrated with Formik
 */
export function FormikCheckbox({ name, helperText, ...props }: FormikCheckboxProps) {
  const [field, meta] = useField({ name, type: 'checkbox' });

  const showError = meta.touched && Boolean(meta.error);

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox {...field} checked={field.value} color={showError ? 'error' : 'primary'} />
        }
        {...props}
      />
      {(showError || helperText) && (
        <FormHelperText error={showError}>{showError ? meta.error : helperText}</FormHelperText>
      )}
    </div>
  );
}
