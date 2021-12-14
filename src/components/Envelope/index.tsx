import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import LogotypeIcon from '@mui/icons-material/Https';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Index: FC = () => {
  const appStore = useAppStore();
  const open = appStore.isOpenMenu;
  const handleDrawerOpen = () => appStore.setIsOpenMenu(true);
  const handleDrawerClose = () => appStore.setIsOpenMenu(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            size="large"
            sx={{
              marginRight: '12px',
              ...(open && { display: 'none' }),
            }}
          >
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
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerClose} size="large">
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Menu />
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Outlet />
      </Main>
      <Dialogs />
    </Box>
  );
};

export default observer(Index);
