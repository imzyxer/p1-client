import React, { FC } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LogotypeIcon from '@material-ui/icons/Https';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import useStyles from 'components/Envelope/styles';
// import Search from 'components/Envelope/Header/Search';
import Account from 'components/Envelope/Header/Account';
import Menu from 'components/Envelope/Menu';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import Dialogs from 'components/App/Dialogs';

const Index: FC = ({ children }) => {
  const appStore = useAppStore();
  const classes = useStyles();
  const open = appStore.isOpenMenu;
  const handleDrawerOpen = () => appStore.setIsOpenMenu(true);
  const handleDrawerClose = () => appStore.setIsOpenMenu(false);

  if (appStore.userIsGuest) {
    return <>{children}</>;
  }

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
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <LogotypeIcon className={classes.title__icon} />
            <Hidden smDown>
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
          <IconButton onClick={handleDrawerClose}>
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
        {children}
      </main>
      <Dialogs />
    </div>
  );
};

export default observer(Index);
