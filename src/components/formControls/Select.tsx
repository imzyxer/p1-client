import React, { FC } from 'react';
import { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectParent from 'components/formControls/SelectParent';
import { TFormSelectOption } from 'types/app';

type TProps = { name: string; label: string; options: TFormSelectOption[]; defaultOption?: TFormSelectOption } & SelectProps;

const Select: FC<TProps> = ({ name, label, options, defaultOption, ...props }) => (
  <SelectParent name={name} label={label} {...props}>
    {defaultOption && (
      <MenuItem value={defaultOption.value} disabled={defaultOption.disabled}>
        {defaultOption.label}
      </MenuItem>
    )}
    {options.map(option => (
      <MenuItem value={option.value} key={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </SelectParent>
);

export default Select;
