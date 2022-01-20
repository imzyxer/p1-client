import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import ProfileComponent from 'components/Profile';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const Profile: FC = () => {
  const { t } = useTranslation('profile');
  const appStore = useAppStore();

  useEffect(() => {
    appStore.setElement(EElement.PROFILE, t('pageTitle'));
  }, [t, appStore]);

  return <ProfileComponent />;
};

export default observer(Profile);
