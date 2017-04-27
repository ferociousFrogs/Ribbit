// type: 'IN_ROOM'
// reducer for toggling the dropdown display
const inRoomReducer = (state = false, action) => {
  switch (action.type) {
    case 'IN_ROOM':
      return action.bool;
    default:
      return state;
  }
};

export default inRoomReducer;