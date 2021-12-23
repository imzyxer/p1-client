import { createTheme as MuiCreateTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const createTheme = (paletteMode: PaletteMode) =>
  MuiCreateTheme({
    palette: {
      mode: paletteMode,
      secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              transition: 'all 0s 50000s',
            },
          },
        },
      },
    },
  });

export default createTheme;
