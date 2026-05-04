import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps,
} from '@mui/material';
import { useField } from 'formik';

export interface FormikSelectOption {
  value: string | number;
  label: string;
}

type FormikSelectProps = SelectProps & {
  name: string;
  label: string;
  options: FormikSelectOption[];
  helperText?: string;
};

/**
 * Select component integrated with Formik
 */
export function FormikSelect({ name, label, options, helperText, ...props }: FormikSelectProps) {
  const [field, meta] = useField(name);

  const showError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={showError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(showError || helperText) && (
        <FormHelperText>{showError ? meta.error : helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
