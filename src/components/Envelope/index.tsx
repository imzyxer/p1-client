import React, { FC } from 'react';
import clsx from 'clsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import LogotypeIcon from '@mui/icons-material/Https';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import useStyles from 'components/Envelope/styles';
// import Search from 'components/Envelope/Header/Search';
import Account from 'components/Envelope/Header/Account';
import Menu from 'components/Envelope/Menu';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import Dialogs from 'components/App/Dialogs';
import { Outlet } from 'react-router-dom';

const Index: FC = () => {
  const appStore = useAppStore();
  const classes = useStyles();
  const open = appStore.isOpenMenu;
  const handleDrawerOpen = () => appStore.setIsOpenMenu(true);
  const handleDrawerClose = () => appStore.setIsOpenMenu(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <LogotypeIcon className={classes.title__icon} />
            <Hidden mdDown>
              <span>
                Storage <strong>П1</strong> <sup>&beta;</sup>
              </span>
            </Hidden>
          </Typography>
          {/* <Search /> */}
          <div className={classes.grow} />
          <Account />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} size="large">
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Menu />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.appBarSpacer} />
        <Outlet />
      </main>
      <Dialogs />
    </div>
  );
};

export default observer(Index);
