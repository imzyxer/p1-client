import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import ProfileContent from 'modules/ProfileModule/ProfileContent';
import PassCodeOverlay from 'modules/ProfileModule/overlays/PassCodeOverlay';
import useAppStore from 'stores/hooks/useAppStore';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';

const ProfileModule: FC = () => {
  const { t } = useTranslation('profile');
  const appStore = useAppStore();

  useEffect(() => {
    appStore.setElement(EElement.PROFILE, t('pageTitle'));
  }, [t, appStore]);

  return (
    <Routes>
      <Route index element={<ProfileContent />} />
      <Route path="passcode" element={<PassCodeOverlay />} />
    </Routes>
  );
};

export default observer(ProfileModule);
