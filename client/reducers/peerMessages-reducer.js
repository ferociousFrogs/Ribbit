const peerMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PEER_MESSAGES':
      return [...action.peerMessages];
    default:
      return state;
  }
};

export default peerMessagesReducer;
