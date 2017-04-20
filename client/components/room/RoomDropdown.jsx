import React from 'react';
import { connect } from 'react-redux';
import RoomDropdownItem from './RoomDropdownItem';
import { toggleDropdown } from './../../actions/actionCreators';

const roomsPlaceholder = ['The Grill', 'Taj Mahal', 'The High Castle', 'Your Mother\'s Bedroom'];
const RoomDropdown = props => (
  <a className="dropdown" onClick={props.toggleDropdown}>
    <p>My Rooms <span className={props.dropdownDisplay ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down'} /></p>
    <div id="myDropdown" className={props.dropdownDisplay ? 'dropdown-content' : 'dropdown-content hide'}>
      {roomsPlaceholder.map((room, i) => <RoomDropdownItem room={room} key={i} />)}
    </div>
  </a>
);
// style button appropriately
// make it so that, on click of the button, state is set "dropdown hidden" from false to true
//

const mapStateToProps = state => ({
  roomName: state.roomName,
  dropdownDisplay: state.dropdownDisplay
});

const mapDispatchToProps = dispatch => ({
  toggleDropdown: () => dispatch(toggleDropdown())
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomDropdown);
