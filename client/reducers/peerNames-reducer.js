const peerNamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PEER_NAMES':
      return action.names;
    default:
      return state;
  }
};

export default peerNamesReducer;
