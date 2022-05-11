import React, { FC } from 'react';
import MuiListItemIcon from '@mui/material/ListItemIcon';

type TProps = {
  children?: React.ReactNode;
};

const ListItemIcon: FC<TProps> = ({ children }) => <MuiListItemIcon sx={{ minWidth: t => t.spacing(5) }}>{children}</MuiListItemIcon>;

export default ListItemIcon;
