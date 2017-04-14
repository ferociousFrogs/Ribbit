import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

// here, we wrap our top level components in the provider
// component, and pass it our store.  This gives us access to the store
// from lower down in the component tree.

render(
  <Provider store={store}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Provider>
  , document.getElementById('app'));
