// this is the file for the redux action creators
// consider adding an id to the message, ex in redux todos
// to create an action:
// 1) declare a function that takes as parameters whatever the parameters
// are/would have been in your function from the main component.
// IN this case, I wanted to send a message so I needed to have a message
// to send, so that translates to having only the parameter of message in
// my sendMessage function.
// 2) the parameters from the function will become your key/value pairs
 // in the action.  I wrote only "message" because ES6 syntax allows you
 // to write just the single word in place of 'message: message'
// export the action.  I'm not sure if we can "export default" a bunch
// of times, and instead may need to write "export const actionName ....."
// for each one


// export default sendMessage;
export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  message
});

export const createRoomName = roomName => ({
  type: 'CREATE_ROOM_NAME',
  roomName
});

export const addUserName = name => ({
  type: 'ADD_USERNAME',
  name
});

export const getMessageText = text => ({
  type: 'GET_MESSAGE_TEXT',
  text
});

export const addUserEmail = email => ({
  type: 'ADD_EMAIL',
  email
});

export const toggleDropdown = () => ({
  type: 'TOGGLE_DROPDOWN'
});

export const previousRoomNames = () => ({
  type: 'GET_PREVIOUS_ROOM_NAMES'
});

export const loggedIn = bool => ({
  type: 'LOGGED_IN',
  bool
});

export const addUserId = userId => ({
  type: 'ADD_USER_ID',
  userId
});
