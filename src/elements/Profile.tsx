import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import ProfileComponent from 'components/Profile';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';

const Profile: FC = () => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.setElement(EElement.PROFILE, 'Profile');
  }, [appStore]);

  return <ProfileComponent />;
};

export default observer(Profile);
