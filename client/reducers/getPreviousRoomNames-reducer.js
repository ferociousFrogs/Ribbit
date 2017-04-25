const getPreviousRoomNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_ROOM_NAMES':
      return action.rooms;
    default:
      return state;
  }
};

export default getPreviousRoomNameReducer;
