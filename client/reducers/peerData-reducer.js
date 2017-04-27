const peerDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PEER_DATA':
      return action.peerData;
    default:
      return state;
  }
};

export default peerDataReducer;
