const getPreviousRoomNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PREVIOUS_ROOM_NAMES':
      if (Array.isArray(action.rooms)) {
        action.rooms.forEach((room) => {
          state.push(room.roomname);
        });
      } else if (state.indexOf(action.rooms) === -1) {
        state.push(action.rooms);
      }
      return state;
    default:
      return state;
  }
};

export default getPreviousRoomNameReducer;
