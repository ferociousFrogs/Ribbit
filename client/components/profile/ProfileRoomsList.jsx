import React from 'react';
import { connect } from 'react-redux';
import ProfileRoomsListItem from './ProfileRoomsListItem';
// [X]functional component
// [X]needs to be a container for the list of rooms.
// [X]needs to accept the rooms from the store (connect) in state.previousRooms
// [X]need to map rooms onto ProfileRoomsListItem component

const ProfileRoomsList = props => (
  <div className="profile-list-height">
    {
      props.previousRoomNames
      .map((previousRoom, i) => <ProfileRoomsListItem key={i} room={previousRoom.roomName} requestRoomData={props.requestRoomData} />)
    }
  </div>
);

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames
});

export default connect(mapStateToProps, null)(ProfileRoomsList);
