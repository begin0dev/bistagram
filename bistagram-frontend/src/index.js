import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import store from './store';

import { Provider } from 'react-redux';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('react-root'));
