const dummyPeerData = { 'Korben Dallas': 
   [ { type: 'message',
       data: 'Mul-ti-pass.',
       id: 7,
       user1name: 'Leeloo',
       user2name: 'Korben Dallas' },
     { type: 'code',
       data: 'const mapStateToProps = state => ({peerData: state.peerData});',
       id: 8,
       user1name: 'Leeloo',
       user2name: 'Korben Dallas' } ],
  'Ruby Rhod': 
   [ { type: 'message',
       data: 'Right hand right here right now.',
       id: 9,
       user1name: 'Leeloo',
       user2name: 'Ruby Rhod' },
     { type: 'code',
       data: 'var fifthElement = "love"',
       id: 10,
       user1name: 'Leeloo',
       user2name: 'Ruby Rhod' } ],
  'Diva Plavalaguna': 
   [ { type: 'message',
       data: 'The stones are in me.',
       id: 11,
       user1name: 'Leeloo',
       user2name: 'Diva Plavalaguna' },
     { type: 'code',
       data: 'socket.emit(\'grab room data\', payload);',
       id: 12,
       user1name: 'Leeloo',
       user2name: 'Diva Plavalaguna' } ] }

const peerDataReducer = (state = dummyPeerData, action) => {
  switch (action.type) {
    case 'ADD_PEER_DATA':
      return action.peerData;
    default:
      return state;
  }
};

export default peerDataReducer;
