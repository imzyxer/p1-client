import React, { FC } from 'react';
import { Field, FieldProps } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';

type TProps = { name: string; label: string } & CheckboxProps;

const Checkbox: FC<TProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field }: FieldProps) => (
      <FormControlLabel
        label={label}
        checked={!!field.value}
        control={<MuiCheckbox name={name} onChange={field.onChange} onBlur={field.onBlur} {...props} />}
      />
    )}
  </Field>
);

export default Checkbox;
