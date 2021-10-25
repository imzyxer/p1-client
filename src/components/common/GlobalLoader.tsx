import React, { FC } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const GlobalLoader: FC<{ invisible?: boolean }> = ({ invisible = true }) => {
  const classes = useStyles();

  return (
    <Backdrop open invisible={invisible} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  );
};

export default GlobalLoader;
