import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import Dashboard from 'components/Dashboard';
import useDashboardStore from 'stores/hooks/useDashboardStore';
import withEnvelope from 'components/hoc/withEnvelope';
import LinearProgress from '@material-ui/core/LinearProgress';
import { APP_NAME } from 'constants/app';
import useAppStore from 'stores/hooks/useAppStore';

const DashboardPage: FC = () => {
  const dashboardStore = useDashboardStore();
  const appStore = useAppStore();

  useEffect(() => {
    document.title = `Dashboard — ${APP_NAME}`;
    dashboardStore.initiate();

    const disposer = reaction(
      () => appStore.entryHasBeenChanged,
      changeNumber => {
        if (changeNumber > 0) dashboardStore.refresh();
      }
    );
    return () => disposer();
  }, []); // eslint-disable-line

  if (!dashboardStore.isInit) {
    return <LinearProgress />;
  }

  return <Dashboard />;
};

export default withEnvelope(observer(DashboardPage));
