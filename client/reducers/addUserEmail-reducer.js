const addUserEmail = (state = '', action) => {
  switch (action.type) {
    case 'ADD_EMAIL':
      return action.email;
    default:
      return state;
  }
};

export default addUserEmail;
