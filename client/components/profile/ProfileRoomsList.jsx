import React from 'react';
import { connect } from 'react-redux';
import ProfileRoomsListItem from './ProfileRoomsListItem';
// functional component
// needs to be a container for the list of rooms.
// needs to accept the rooms from the store (connect) in state.previousRooms
// need to map rooms onto ProfileRoomsListItem component

const ProfileRoomsList = props => (
  <div>
    {
      props.previousRoomNames
      .map((previousRoom, i) => <ProfileRoomsListItem key={i} room={previousRoom} />)
    }
  </div>
);

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames
});

export default connect(mapStateToProps, null)(ProfileRoomsList);
