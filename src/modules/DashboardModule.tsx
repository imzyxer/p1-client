import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import DashboardContent from 'modules/DashboardModule/DashboardContent';
import useRootStore from 'stores/hooks/useRootStore';
import LinearProgress from '@mui/material/LinearProgress';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const DashboardModule: FC = () => {
  const { appStore, dashboardStore } = useRootStore();
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    appStore.setElement(EElement.DASHBOARD, t('pageTitle'));
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

  return <DashboardContent />;
};

export default observer(DashboardModule);
