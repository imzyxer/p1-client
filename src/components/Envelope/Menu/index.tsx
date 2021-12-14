import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageGroupIcon from '@mui/icons-material/CreateNewFolder';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MenuItemAddThing from 'components/Envelope/Menu/MenuItemAddThing';
import { Link } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import GroupList from 'components/Envelope/Menu/GroupList';
import { useRootStore } from 'stores/hooks/useRootStore';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';

const Index: FC = () => {
  const appStore = useAppStore();
  const { groupsManageStore } = useRootStore();

  return (
    <>
      <List>
        <ListItem button component={Link} to={urns.getDashboardUrn()} selected={appStore.element === EElement.DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <MenuItemAddThing />
        <ListItem button onClick={() => groupsManageStore.open()}>
          <ListItemIcon>
            <ManageGroupIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Groups" />
        </ListItem>
      </List>
      <Divider />
      <GroupList />
    </>
  );
};

export default observer(Index);
