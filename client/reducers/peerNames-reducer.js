const dummyPeerNames = ["Korben Dallas", "Ruby Rhod", "Diva Plavalaguna"];

const peerNamesReducer = (state = dummyPeerNames, action) => {
  switch (action.type) {
    case 'ADD_PEER_NAMES':
      return action.names;
    default:
      return state;
  }
};

export default peerNamesReducer;
