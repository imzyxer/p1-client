import React, { FC } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import CCEntity from 'entities/CCEntity';

type TProps = { name: string; label: string } & TextFieldProps;

const CCNumberField: FC<TProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, meta, form }: FieldProps) => (
      <MuiTextField
        name={name}
        label={label}
        value={CCEntity.formatCardNumber(field.value)}
        onChange={e => {
          const pos = e.target.selectionEnd;
          form.setFieldValue(name, CCEntity.clearCardNumber(e.target.value));
          if (pos && pos < e.target.value.length) {
            setTimeout(() => {
              e.target.selectionEnd = pos;
            }, 0);
          }
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

export default CCNumberField;
