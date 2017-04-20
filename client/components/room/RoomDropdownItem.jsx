import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoomName } from './../../actions/actionCreators';


const RoomDropdownItem = props => {
  const setRoomName = () => props.createRoomName(props.room);
  return (
    <div className="dropdown-item" >
      <Link to={`/:${props.room}`} onClick={setRoomName}>{props.room}</Link>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  createRoomName: roomName => dispatch(createRoomName(roomName))
});

export default connect(null, mapDispatchToProps)(RoomDropdownItem);
