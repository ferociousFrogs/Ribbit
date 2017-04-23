const addUserId = (state = undefined, action) => {
  switch (action.type) {
    case 'ADD_USER_ID':
      return action.userId;
    default:
      return state;
  }
};

export default addUserId;
