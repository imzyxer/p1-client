import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ManageGroupIcon from '@material-ui/icons/CreateNewFolder';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
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
