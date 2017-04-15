// reducer for adding random username

const addUserNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      return action.name;
    default:
      return state;
  }
};

export default addUserNameReducer;
