import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import AppContainer from 'components/AppContainer';
import RootStore, { RootStoreContext } from 'stores/RootStore';
import PrimaryAuthenticator from 'services/PrimaryAuthenticator';
import PrimaryClient from 'services/PrimaryClient';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as yup from 'yup';
import yupLocale from 'utils/yupLocale';
import { LinearProgress } from '@mui/material';
import AppRouter from 'router/AppRouter';
import './i18n';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (process.env.NODE_ENV === 'production') {
  const sentryDsn = process.env.REACT_APP_SENTRY_DSN ?? null;
  if (sentryDsn !== null) {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
}

yup.setLocale(yupLocale);

const store = new RootStore();
const baseURL = process.env.REACT_APP_API_HOST ?? '';
const authenticator = new PrimaryAuthenticator();
PrimaryClient.createClientInstance(baseURL, authenticator);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <RootStoreContext.Provider value={store}>
    <Suspense fallback={<LinearProgress />}>
      <AppContainer>
        <AppRouter />
      </AppContainer>
    </Suspense>
  </RootStoreContext.Provider>
);

serviceWorkerRegistration.register();
