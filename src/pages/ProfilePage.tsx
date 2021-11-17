import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import withEnvelope from 'components/hoc/withEnvelope';
import { APP_NAME } from 'constants/app';
import Profile from 'components/Profile';

const ProfilePage: FC = () => {
  // const historyStore = useHistoryStore();
  useEffect(() => {
    document.title = `Profile — ${APP_NAME}`;
    // historyStore.initiate();
  }, []);

  // if (historyStore.progress !== EProgress.LOADED) return <LinearProgress />;

  return <Profile />;
};

export default withEnvelope(observer(ProfilePage));
