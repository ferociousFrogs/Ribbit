// This is the file for the redux store
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
