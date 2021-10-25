import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getDashboardUrn } from 'utils/getUrn';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';

const LoginRoute: FC<RouteProps> = props => {
  const appStore = useAppStore();
  if (!appStore.userIsGuest) {
    return <Redirect to={getDashboardUrn()} />;
  }

  return <Route {...props} />;
};

export default observer(LoginRoute);
