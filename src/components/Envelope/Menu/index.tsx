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
import useRootStore from 'stores/hooks/useRootStore';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const Index: FC = () => {
  const appStore = useAppStore();
  const { groupsManageStore } = useRootStore();
  const { t } = useTranslation();

  return (
    <>
      <List>
        <ListItem button component={Link} to={urns.getDashboardUrn()} selected={appStore.element === EElement.DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.dashboard')} />
        </ListItem>
        <MenuItemAddThing />
        <ListItem button onClick={() => groupsManageStore.open()}>
          <ListItemIcon>
            <ManageGroupIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.manageGroups')} />
        </ListItem>
      </List>
      <Divider />
      <GroupList />
    </>
  );
};

export default observer(Index);
