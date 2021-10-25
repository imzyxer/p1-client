import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import History from 'components/History';
import withEnvelope from 'components/hoc/withEnvelope';
import { APP_NAME } from 'constants/app';
import useHistoryStore from 'stores/hooks/useHistoryStore';
import { EProgress } from 'types/app';
import LinearProgress from '@material-ui/core/LinearProgress';

const HistoryPage: FC = () => {
  const historyStore = useHistoryStore();
  useEffect(() => {
    document.title = `History — ${APP_NAME}`;
    historyStore.initiate();
  }, [historyStore]);

  if (historyStore.progress !== EProgress.LOADED) return <LinearProgress />;

  return <History />;
};

export default withEnvelope(observer(HistoryPage));
