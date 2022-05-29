import React, { FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from 'components/common/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageGroupIcon from '@mui/icons-material/CreateNewFolder';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MenuItemAddThing from 'components/Envelope/Sidebar/MenuItemAddThing';
import { Link } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import GroupList from 'components/Envelope/Sidebar/GroupList';
import useRootStore from 'stores/hooks/useRootStore';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const Sidebar: FC = () => {
  const appStore = useAppStore();
  const { groupsManageStore } = useRootStore();
  const { t } = useTranslation();

  return (
    <>
      <List>
        <ListItemButton component={Link} to={urns.getDashboardUrn()} selected={appStore.element === EElement.DASHBOARD}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.dashboard')} />
        </ListItemButton>
        <MenuItemAddThing />
        <ListItemButton onClick={() => groupsManageStore.open()}>
          <ListItemIcon>
            <ManageGroupIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.manageGroups')} />
        </ListItemButton>
      </List>
      <Divider />
      <GroupList />
    </>
  );
};

export default observer(Sidebar);
