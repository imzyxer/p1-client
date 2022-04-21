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
import ListItemIcon from 'components/common/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@mui/icons-material/History';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const Account: FC = () => {
  const { t } = useTranslation();
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
        size="large"
        sx={{
          borderRadius: '4px',
        }}
      >
        <Hidden mdDown>
          <Box
            component="span"
            sx={{
              fontSize: theme => theme.typography.fontSize,
              paddingRight: theme => theme.spacing(1),
            }}
          >
            {appStore.user.email}
          </Box>
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
          <ListItemText primary={t('menu.profile')} />
        </MenuItem>
        <MenuItem selected={appStore.element === EElement.HISTORY} component={Link} to={getHistoryUrn()}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.accessHistory')} />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.logout')} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default observer(Account);
