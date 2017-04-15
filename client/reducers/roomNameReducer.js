const roomNameReducer = (state = [], action) => {
  if (action.type === 'CREATE_ROOM_NAME') {
    return action.roomName;
  }
  return state;
};

export default roomNameReducer;
