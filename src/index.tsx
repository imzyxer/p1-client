import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'components/App/Wrapper';
import { UseRootStore } from 'stores/hooks/useRootStore';
import PrimaryAuthenticator from 'services/PrimaryAuthenticator';
import PrimaryClient from 'services/PrimaryClient';
import App from './App';

const baseURL = process.env.REACT_APP_API_HOST ?? '';
const authenticator = new PrimaryAuthenticator();
PrimaryClient.createClientInstance(baseURL, authenticator);

ReactDOM.render(
  <UseRootStore>
    <Wrapper>
      <App />
    </Wrapper>
  </UseRootStore>,
  document.getElementById('root')
);
