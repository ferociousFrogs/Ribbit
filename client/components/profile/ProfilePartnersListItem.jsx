import React from 'react';

// [X]needs to render an individual partner
// []each partner needs to be clickable
// []onClick, each partner needs to send out a function that will grab the code and messages connected to that room and connected to the logged in user/
// []this will populate a space in state - partnerLogs
  // [X]we need an action - getPartnerLogs which takes in an object that has two keys {code: '', messages: []}
  // []messages need to be sorted by timestamp, with oldest being placed in the array in state first
  // [X]we need a reducer - partnerLogsReducer
const ProfilePartnersListItem = props => (
  <div onClick={() => props.separateData(props.peer)}>
    {props.peer}
  </div>
);


export default ProfilePartnersListItem;
