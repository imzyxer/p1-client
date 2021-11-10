import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PaymentIcon from '@material-ui/icons/Payment';
import useEntryAddStore from 'stores/hooks/useEntryAddStore';
import { EEntryType } from 'types/entry';

const MenuItemAddEntry: FC = () => {
  const entryAddStore = useEntryAddStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (type: EEntryType) => () => {
    entryAddStore.open(type);
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
        <MenuItem onClick={handleClick(EEntryType.PASSWORD)}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Password" />
        </MenuItem>
        <MenuItem onClick={handleClick(EEntryType.CARD)}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Card" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuItemAddEntry;
