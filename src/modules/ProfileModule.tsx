import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import ProfileContent from 'modules/ProfileModule/Content';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const ProfileModule: FC = () => {
  const { t } = useTranslation('profile');
  const appStore = useAppStore();

  useEffect(() => {
    appStore.setElement(EElement.PROFILE, t('pageTitle'));
  }, [t, appStore]);

  return <ProfileContent />;
};

export default observer(ProfileModule);
