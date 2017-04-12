// this is the file for the redux root reducer
import { combineReducers } from 'redux';
import chatMessage from './chatMessage-reducer';

const rootReducer = combineReducers({
  chatMessage
});

export default rootReducer;
