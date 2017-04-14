// this is the file for the redux root reducer
import { combineReducers } from 'redux';
import chatMessagesReducer from './chatMessage-reducer';

const rootReducer = combineReducers({
  messages: chatMessagesReducer
});

export default rootReducer;
