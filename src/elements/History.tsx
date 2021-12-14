import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import HistoryComponent from 'components/History';
import useHistoryStore from 'stores/hooks/useHistoryStore';
import { EElement, EProgress } from 'types/app';
import LinearProgress from '@mui/material/LinearProgress';
import useAppStore from 'stores/hooks/useAppStore';

const History: FC = () => {
  const appStore = useAppStore();
  const historyStore = useHistoryStore();

  useEffect(() => {
    appStore.setElement(EElement.HISTORY, 'History');
    historyStore.initiate();
  }, [appStore, historyStore]);

  if (historyStore.progress !== EProgress.LOADED) return <LinearProgress />;

  return <HistoryComponent />;
};

export default observer(History);
