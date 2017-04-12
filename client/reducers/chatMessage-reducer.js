// reducer for sending messages from chat
const chatMessage = (state, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        message: action.message
      };
    default:
      return state;
  }
};

export default chatMessage;
