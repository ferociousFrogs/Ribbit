// this is the file for the redux root reducer
import { combineReducers } from 'redux';
import chatMessagesReducer from './chatMessage-reducer';
import roomNameReducer from './roomNameReducer';
import addUserNameReducer from './addUserName-reducer';
import messageTextReducer from './messageText-reducer';

const rootReducer = combineReducers({
  messages: chatMessagesReducer,
  userName: addUserNameReducer,
  roomName: roomNameReducer,
  text: messageTextReducer
});

export default rootReducer;
