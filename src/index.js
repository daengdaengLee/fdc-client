import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from './ducks';
import MainPage from './components/5-pages/main-page';
import 'antd/dist/antd.css';
import './index.css';

injectGlobal`
  html, body, #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={MainPage} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
