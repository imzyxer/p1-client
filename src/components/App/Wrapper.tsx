import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { Outlet } from 'react-router-dom';

const Wrapper: FC = () => (
  <SnackbarProvider maxSnack={3}>
    <CssBaseline />
    <Outlet />
  </SnackbarProvider>
);

export default Wrapper;
