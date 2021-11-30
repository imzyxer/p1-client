import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import withEnvelope from 'components/hoc/withEnvelope';
import { APP_NAME } from 'constants/app';
import Profile from 'components/Profile';

const ProfilePage: FC = () => {
  useEffect(() => {
    document.title = `Profile — ${APP_NAME}`;
  }, []);

  return <Profile />;
};

export default withEnvelope(observer(ProfilePage));
