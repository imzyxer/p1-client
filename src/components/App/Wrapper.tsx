import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

const Wrapper: FC = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    <CssBaseline />
    {children}
  </SnackbarProvider>
);

export default Wrapper;
