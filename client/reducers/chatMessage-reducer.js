// reducer for sending messages from chat

// the function of a reducer is to take the state as it is, make a
// copy of the state, apply the changes to the copy, and then return the
// modified copy.  This is called a "pure function" because it does not
// mutate the input and has no side effects.

// we will pass this root reducer into the store in the store.js file

const chatMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return [
        ...state,
        // chatMessage(undefined, action)
        action.message
      ];
    default:
      return state;
  }
};

export default chatMessagesReducer;
