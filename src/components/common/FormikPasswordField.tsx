import React, { FC, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Field, FieldProps } from 'formik';

type TProps = {
  id: string;
  name: string;
  label: string;
  labelWidth: number;
};

const FormikPasswordField: FC<TProps & OutlinedInputProps> = ({ id, name, label, labelWidth, ...muiParams }) => {
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
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={labelWidth}
          />
          <FormHelperText>{meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikPasswordField;
