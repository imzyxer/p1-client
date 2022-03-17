import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import HistoryComponent from 'components/modules/History';
import useHistoryStore from 'stores/hooks/useHistoryStore';
import { EElement, EProgress } from 'types/app';
import LinearProgress from '@mui/material/LinearProgress';
import useAppStore from 'stores/hooks/useAppStore';
import { useTranslation } from 'react-i18next';

const History: FC = () => {
  const { t } = useTranslation('history');
  const appStore = useAppStore();
  const historyStore = useHistoryStore();

  useEffect(() => {
    appStore.setElement(EElement.HISTORY, t('pageTitle'));
    historyStore.initiate();
  }, [t, appStore, historyStore]);

  if (historyStore.progress !== EProgress.LOADED) return <LinearProgress />;

  return <HistoryComponent />;
};

export default observer(History);
