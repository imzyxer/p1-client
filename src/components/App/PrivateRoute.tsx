import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getLoginUrn } from 'utils/getUrn';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';

const PrivateRoute: FC<RouteProps> = props => {
  const appStore = useAppStore();

  if (appStore.userIsGuest) {
    return <Redirect to={getLoginUrn()} />;
  }

  return <Route {...props} />;
};

export default observer(PrivateRoute);
