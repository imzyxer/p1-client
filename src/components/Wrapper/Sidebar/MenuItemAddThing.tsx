import React, { FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from 'components/common/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PaymentIcon from '@mui/icons-material/Payment';
import useThingAddStore from 'stores/hooks/useThingAddStore';
import { EThingType } from 'types/thing';
import { useTranslation } from 'react-i18next';

const MenuItemAddThing: FC = () => {
  const { t } = useTranslation();
  const thingAddStore = useThingAddStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (type: EThingType) => () => {
    thingAddStore.open(type);
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t('menu.addThing')} />
      </ListItemButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClick(EThingType.PASSWORD)}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('menu.addPassword')} />
        </MenuItem>
        <MenuItem onClick={handleClick(EThingType.CARD)}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('menu.addCard')} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuItemAddThing;
