const messageTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_MESSAGE_TEXT':
      return action.text;
    default:
      return state;
  }
};

export default messageTextReducer;
