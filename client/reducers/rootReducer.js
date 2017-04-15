// this is the file for the redux root reducer
import { combineReducers } from 'redux';
import chatMessagesReducer from './chatMessage-reducer';
import addUserNameReducer from './addUserName-reducer';

const rootReducer = combineReducers({
  messages: chatMessagesReducer,
  userName: addUserNameReducer
});

export default rootReducer;
