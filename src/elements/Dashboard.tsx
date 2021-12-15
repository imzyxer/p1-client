import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import DashboardComponent from 'components/Dashboard';
import useDashboardStore from 'stores/hooks/useDashboardStore';
import LinearProgress from '@mui/material/LinearProgress';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';

const Dashboard: FC = () => {
  const appStore = useAppStore();
  const dashboardStore = useDashboardStore();

  useEffect(() => {
    appStore.setElement(EElement.DASHBOARD, 'Dashboard');
    dashboardStore.initiate(appStore.thingHasBeenChanged > 0);

    const disposer = reaction(
      () => appStore.thingHasBeenChanged,
      changeNumber => {
        if (changeNumber > 0) dashboardStore.refresh();
      }
    );
    return () => disposer();
  }, []); // eslint-disable-line

  if (!dashboardStore.isInit) {
    return <LinearProgress />;
  }

  return <DashboardComponent />;
};

export default observer(Dashboard);
