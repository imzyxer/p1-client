import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'components/App/Wrapper';
import { UseRootStore } from 'stores/hooks/useRootStore';
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

const baseURL = process.env.REACT_APP_API_HOST ?? '';
const authenticator = new PrimaryAuthenticator();
PrimaryClient.createClientInstance(baseURL, authenticator);

ReactDOM.render(
  <UseRootStore>
    <Suspense fallback={<LinearProgress />}>
      <Wrapper>
        <App />
      </Wrapper>
    </Suspense>
  </UseRootStore>,
  document.getElementById('root')
);
