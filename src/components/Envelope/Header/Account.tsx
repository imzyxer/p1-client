import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { observer } from 'mobx-react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { getLoginUrn, getHistoryUrn, getProfileUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import { PAGE_HISTORY, PAGE_PROFILE } from 'constants/pages';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

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
  const params = useParams<Record<string, string | undefined>>();
  const appStore = useAppStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    appStore.signOut(() => history.replace(getLoginUrn()));
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
      >
        <span className={classes.email}>{appStore.user.email}</span> <AccountCircle />
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
        <MenuItem selected={params.name === PAGE_PROFILE} component={Link} to={getProfileUrn()}>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem selected={params.name === PAGE_HISTORY} component={Link} to={getHistoryUrn()}>
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
