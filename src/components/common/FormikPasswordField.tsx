import React, { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { Field, FieldProps } from 'formik';

type TProps = {
  id: string;
  name: string;
  label: string;
};

const FormikPasswordField: FC<TProps & OutlinedInputProps> = ({ id, name, label, ...muiParams }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <FormControl variant="outlined" fullWidth error={meta.touched && Boolean(meta.error)}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <OutlinedInput
            {...muiParams}
            {...field}
            id={id}
            value={field.value}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            sx={{ fontFamily: `'Roboto Mono', monospace` }}
          />
          <FormHelperText>{meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikPasswordField;
