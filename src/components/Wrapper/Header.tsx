import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import LogotypeIcon from '@mui/icons-material/Https';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import Account from 'components/Wrapper/Header/Account';

type TProps = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

const Header: FC<TProps> = ({ drawerWidth, handleDrawerToggle }) => (
  <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    }}
  >
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} size="large" sx={{ mr: 2, display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontWeight: 100,
          whiteSpace: 'nowrap',
        }}
      >
        <LogotypeIcon sx={{ marginRight: '12px' }} />
        <Hidden mdDown>
          <span>
            Storage <strong>П1</strong> <sup>&beta;</sup>
          </span>
        </Hidden>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Account />
    </Toolbar>
  </AppBar>
);

export default Header;
