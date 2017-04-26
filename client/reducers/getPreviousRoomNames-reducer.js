const getPreviousRoomNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_ROOM_NAMES':
      return [...state, ...action.rooms];
    case 'GET_PREVIOUS_ROOM_STRING':
      return [...state, { roomName: action.room }];
    default:
      return state;
  }
};

export default getPreviousRoomNameReducer;
