import React, { FC } from 'react';
import MuiListItemIcon from '@mui/material/ListItemIcon';

const ListItemIcon: FC = ({ children }) => <MuiListItemIcon sx={{ minWidth: t => t.spacing(5) }}>{children}</MuiListItemIcon>;

export default ListItemIcon;
