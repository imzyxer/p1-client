import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from 'components/App/theme';

const Wrapper: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <>{children}</>
    </SnackbarProvider>
  </ThemeProvider>
);

export default Wrapper;
