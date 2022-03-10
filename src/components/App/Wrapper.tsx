import React, { FC, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import createTheme from 'themes/createTheme';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';

const Wrapper: FC = ({ children }) => {
  const appStore = useAppStore();
  const { paletteMode } = appStore;
  const theme = useMemo(() => createTheme(paletteMode), [paletteMode]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <>{children}</>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default observer(Wrapper);
