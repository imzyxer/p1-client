import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { getDashboardUrn, getLoginUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import { useLocation, Navigate } from 'react-router-dom';

const Home: FC = () => {
  const appStore = useAppStore();
  const location = useLocation();
  if (appStore.userIsGuest) {
    return <Navigate to={getLoginUrn()} state={{ from: location }} />;
  }

  return <Navigate to={getDashboardUrn()} state={{ from: location }} />;
};

export default observer(Home);
