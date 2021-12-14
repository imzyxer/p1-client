import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import theme from 'components/App/theme';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const Wrapper: FC = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <>{children}</>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

export default Wrapper;
