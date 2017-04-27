const dummyPeerData = { 'Korben Dallas': 
   [ { type: 'message', data: 'Mul-ti-pass.', id: 7 },
     { type: 'code',
       data: 'const mapStateToProps = state => ({peerData: state.peerData});',
       id: 8 } ],
  'Ruby Rhod': 
   [ { type: 'message',
       data: 'Right hand right here right now.',
       id: 9 },
     { type: 'code', data: 'var fifthElement = "love"', id: 10 } ],
  'Diva Plavalaguna': 
   [ { type: 'message', data: 'The stones are in me.', id: 11 },
     { type: 'code',
       data: 'socket.emit(\'grab room data\', payload);',
       id: 12 } ] };

const peerDataReducer = (state = dummyPeerData, action) => {
  switch (action.type) {
    case 'ADD_PEER_DATA':
      return action.peerData;
    default:
      return state;
  }
};

export default peerDataReducer;
