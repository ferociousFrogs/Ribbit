import React from 'react';

// [X]needs to render an individual room
// []each room needs to be clickable
// []onClick, each room needs to send out a function that will grab the users connected to that room and connected to the logged in user.
// []function name = populatePartners (passed down from Profile)
// []Styling must change to show that the room is selected (action/reducer?)
// []this will populate a space in state - partners
  // [X]we need an action - getPartners which takes in an array of objects
  // [X]we need a reducer - partnersReducer
  // [] Pass down requestRoomData function from Profile

const ProfileRoomsListItem = props => (
  <div onClick={() => props.requestRoomData(props.room) } >
    {props.room}
  </div>
);


export default ProfileRoomsListItem;
