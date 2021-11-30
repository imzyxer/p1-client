import React, { FC, useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import GlobalLoader from 'components/common/GlobalLoader';
import * as pages from 'constants/pages';
import { getDashboardUrn, getLoginUrn } from 'utils/getUrn';
import PrivateRoute from 'components/App/PrivateRoute';
import LoginRoute from 'components/App/LoginRoute';
import useAppStore from 'stores/hooks/useAppStore';
import { LinearProgress } from '@material-ui/core';
import Wrapper from 'components/App/Wrapper';

const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const HistoryPage = React.lazy(() => import('pages/HistoryPage'));
const GroupViewPage = React.lazy(() => import('pages/GroupViewPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const InternalErrorPage = React.lazy(() => import('pages/InternalErrorPage'));
const App: FC = () => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.initiate();
  }, [appStore]);

  if (!appStore.isInit) {
    return <GlobalLoader />;
  }

  return (
    <Wrapper>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <PrivateRoute path={pages.PATH_DASHBOARD} exact strict component={DashboardPage} />
          <PrivateRoute path={pages.PATH_HISTORY} exact strict component={HistoryPage} />
          <PrivateRoute path={pages.PATH_GROUP} exact strict component={GroupViewPage} />
          <PrivateRoute path={pages.PATH_PROFILE} exact strict component={ProfilePage} />
          <LoginRoute path={pages.PATH_LOGIN} exact strict component={LoginPage} />
          <LoginRoute path={pages.PATH_ERROR_500} exact strict component={InternalErrorPage} />
          <Route path={pages.PATH_HOME} exact strict>
            {appStore.userIsGuest && <Redirect to={getLoginUrn()} />}
            {!appStore.userIsGuest && <Redirect to={getDashboardUrn()} />}
          </Route>
          <Route path={pages.PATH_SIGNUP} exact strict component={SignupPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Wrapper>
  );
};

export default observer(App);
