// reducer for adding peer name

const peerNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_PEER_NAME':
      return action.peerName;
    default:
      return state;
  }
};

export default peerNameReducer;
