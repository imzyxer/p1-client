import React, { FC } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import LogotypeIcon from '@mui/icons-material/Https';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Account from 'components/Envelope/Header/Account';
import Menu from 'components/Envelope/Menu';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import Dialogs from 'components/App/Dialogs';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Index: FC = () => {
  const appStore = useAppStore();
  const mobileOpen = appStore.isOpenMenu;
  const handleDrawerToggle = () => appStore.setIsOpenMenu(!mobileOpen);
  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <Menu />
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
      <Dialogs />
    </Box>
  );
};

export default observer(Index);
