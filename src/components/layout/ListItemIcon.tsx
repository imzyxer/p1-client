import React, { FC } from 'react';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

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
