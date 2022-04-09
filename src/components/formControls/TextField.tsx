import React, { FC } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';

type TProps = { name: string; label: string } & TextFieldProps;

const TextField: FC<TProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <MuiTextField
        name={name}
        label={label}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        fullWidth
        variant="outlined"
        {...props}
      />
    )}
  </Field>
);

export default TextField;
