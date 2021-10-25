import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ManageGroupIcon from '@material-ui/icons/CreateNewFolder';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuItemAddEntry from 'components/Envelope/Menu/MenuItemAddEntry';
import { Link, useParams } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import { PAGE_DASHBOARD } from 'constants/pages';
import GroupList from 'components/Envelope/Menu/GroupList';
import { useRootStore } from 'stores/hooks/useRootStore';

const Index: FC = () => {
  const params = useParams<Record<string, string | undefined>>();
  const { groupsManageStore } = useRootStore();

  return (
    <>
      <List>
        <ListItem button component={Link} to={urns.getDashboardUrn()} selected={params.name === PAGE_DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <MenuItemAddEntry />
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

export default Index;
