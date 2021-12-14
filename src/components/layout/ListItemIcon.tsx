import React, { FC } from 'react';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: theme.spacing(5),
  },
}));

const ListItemIcon: FC = ({ children }) => {
  const classes = useStyles();

  return <MuiListItemIcon className={classes.root}>{children}</MuiListItemIcon>;
};

export default ListItemIcon;
