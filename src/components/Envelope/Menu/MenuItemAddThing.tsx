import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PaymentIcon from '@mui/icons-material/Payment';
import useThingAddStore from 'stores/hooks/useThingAddStore';
import { EThingType } from 'types/thing';

const MenuItemAddThing: FC = () => {
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
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Add Thing" />
      </ListItem>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClick(EThingType.PASSWORD)}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Password" />
        </MenuItem>
        <MenuItem onClick={handleClick(EThingType.CARD)}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Card" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuItemAddThing;
