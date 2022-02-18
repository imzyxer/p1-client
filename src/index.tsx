import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'components/App/Wrapper';
import RootStore, { RootStoreContext } from 'stores/RootStore';
import PrimaryAuthenticator from 'services/PrimaryAuthenticator';
import PrimaryClient from 'services/PrimaryClient';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as yup from 'yup';
import yupLocale from 'utils/yupLocale';
import { LinearProgress } from '@mui/material';
import './i18n';
import App from './App';

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

ReactDOM.render(
  <RootStoreContext.Provider value={store}>
    <Suspense fallback={<LinearProgress />}>
      <Wrapper>
        <App />
      </Wrapper>
    </Suspense>
  </RootStoreContext.Provider>,
  document.getElementById('root')
);
