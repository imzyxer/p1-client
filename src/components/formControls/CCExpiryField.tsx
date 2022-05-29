import React, { FC } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import CCEntity from 'entities/CCEntity';

type TProps = { name: string; label: string } & TextFieldProps;

const CCExpiryField: FC<TProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, meta, form }: FieldProps) => (
      <MuiTextField
        name={name}
        label={label}
        value={CCEntity.formatCardExpiry(field.value || '')}
        onChange={e => {
          form.setFieldValue(name, CCEntity.formatCardExpiry(e.target.value || ''));
        }}
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

export default CCExpiryField;
