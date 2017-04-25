import React from 'react';

// [X]needs to render an individual room
// []each room needs to be clickable
// []onClick, each room needs to send out a function that will grab the users connected to that room and connected to the logged in user.
// []function name = populatePartners (passed down from Profile)
// []this will populate a space in state - partners
  // []we need an action - getPartners which takes in an array of strings(objects(?))
  // []we need a reducer - partnersReducer
  // []the action will be called from this component on click.

const ProfileRoomsListItem = props => (
  <div>
    {props.room}
  </div>
);


export default ProfileRoomsListItem;