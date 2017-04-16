// this is the file for the redux root reducer
import { combineReducers } from 'redux';
import chatMessagesReducer from './chatMessage-reducer';
import roomNameReducer from './roomNameReducer';
import addUserNameReducer from './addUserName-reducer';
import messageTextReducer from './messageText-reducer';
import addUserEmail from './addUserEmail-reducer';

const rootReducer = combineReducers({
  messages: chatMessagesReducer,
  userName: addUserNameReducer,
  roomName: roomNameReducer,
  text: messageTextReducer,
  email: addUserEmail
});

export default rootReducer;
