import React, { FC } from 'react';
import { Field, FieldProps } from 'formik';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

type TProps = { name: string; label: string } & SelectProps;

const SelectParent: FC<TProps> = ({ name, label, labelId, children, ...props }) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => (
      <FormControl variant="outlined" style={{ minWidth: '100%' }} error={meta.touched && Boolean(meta.error)}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <MuiSelect name={name} label={label} value={field.value} onChange={field.onChange} onBlur={field.onBlur} fullWidth {...props}>
          {children}
        </MuiSelect>
        {meta.touched && Boolean(meta.error) && <FormHelperText>{meta.error}</FormHelperText>}
      </FormControl>
    )}
  </Field>
);

export default SelectParent;
