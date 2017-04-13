// This is the file for the redux store
import { createStore } from 'redux';

// import the root reducer
import rootReducer from './reducers/rootReducer';

// BE SURE TO DOWNLOAD THE REDUX DEV TOOLS
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
// I give access to the dev tools in the second parameter of the
// createStore function.  The comments that say "eslint-disable" stop
// the linter from causing problems.

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default store;
