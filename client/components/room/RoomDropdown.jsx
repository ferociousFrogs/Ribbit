import React from 'react';
import { connect } from 'react-redux';
import RoomDropdownItem from './RoomDropdownItem';
import { toggleDropdown } from './../../actions/actionCreators';


const RoomDropdown = props => (
  <a className="dropdown" onClick={props.toggleDropdown}>
    <p>My Rooms <span className={props.dropdownDisplay ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down'} /></p>
    <div id="myDropdown" className={props.dropdownDisplay ? 'dropdown-content' : 'dropdown-content hide'}>
      {props.previousRoomNames.map((room, i) => <RoomDropdownItem room={room.roomName} key={room.roomName} />)}
    </div>
  </a>
);

const mapStateToProps = state => ({
  roomName: state.roomName,
  dropdownDisplay: state.dropdownDisplay,
  previousRoomNames: state.previousRoomNames
});

const mapDispatchToProps = dispatch => ({
  toggleDropdown: () => dispatch(toggleDropdown())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomDropdown);
