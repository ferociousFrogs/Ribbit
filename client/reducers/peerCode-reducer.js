const peerCodeReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_PEER_CODE':
      return action.peerCode;
    default:
      return state;
  }
};

export default peerCodeReducer;
