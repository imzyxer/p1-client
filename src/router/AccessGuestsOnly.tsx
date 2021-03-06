import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getDashboardUrn } from 'utils/getUrn';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';

type TProps = {
  children?: React.ReactNode;
};

const AccessGuestOnly: FC<TProps> = ({ children }) => {
  const appStore = useAppStore();
  const location = useLocation();
  if (!appStore.userIsGuest) {
    return <Navigate to={getDashboardUrn()} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default observer(AccessGuestOnly);
