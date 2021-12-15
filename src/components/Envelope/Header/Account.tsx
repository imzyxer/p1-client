import React, { FC } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FaceIcon from '@mui/icons-material/Face';
import { observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';
import { getHistoryUrn, getLoginUrn, getProfileUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@mui/icons-material/History';
import { Theme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Hidden from '@mui/material/Hidden';
import { EElement } from 'types/app';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '4px',
    },
    email: {
      fontSize: theme.typography.fontSize,
      paddingRight: theme.spacing(1),
    },
  });

const Account: FC<WithStyles<typeof styles>> = ({ classes }) => {
  const appStore = useAppStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    appStore.signOut(() => navigate(getLoginUrn(), { replace: true }));
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className={classes.root}
        size="large"
      >
        <Hidden mdDown>
          <span className={classes.email}>{appStore.user.email}</span>
        </Hidden>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem selected={appStore.element === EElement.PROFILE} component={Link} to={getProfileUrn()}>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem selected={appStore.element === EElement.HISTORY} component={Link} to={getHistoryUrn()}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Access History" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withStyles(styles)(observer(Account));
