import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UseRootStore } from 'stores/hooks/useRootStore';
import App from './App';

ReactDOM.render(
  <UseRootStore>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UseRootStore>,
  document.getElementById('root')
);
