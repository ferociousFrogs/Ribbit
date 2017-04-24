// type: 'LOGGED_IN'
// reducer for toggling the dropdown display
const loggedInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.bool;
    default:
      return state;
  }
};

export default loggedInReducer;
