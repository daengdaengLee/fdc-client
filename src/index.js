import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks';
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
    <Router>
      <Route component={MainPage} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
