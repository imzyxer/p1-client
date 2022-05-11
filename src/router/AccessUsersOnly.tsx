import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getLoginUrn } from 'utils/getUrn';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';

type TProps = {
  children?: React.ReactNode;
};

const AccessUsersOnly: FC<TProps> = ({ children }) => {
  const appStore = useAppStore();
  const location = useLocation();
  if (appStore.userIsGuest) {
    return <Navigate to={getLoginUrn()} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default observer(AccessUsersOnly);
