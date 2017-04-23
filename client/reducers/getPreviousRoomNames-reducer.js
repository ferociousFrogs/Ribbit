const getPreviousRoomNameReducer = (state = ['The Grill', 'Taj Mahal', 'The High Castle', 'Your Mother\'s Bedroom'], action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_ROOM_NAMES':
      return state;
    default:
      return state;
  }
};

export default getPreviousRoomNameReducer;
