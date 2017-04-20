import React from 'react';
import { Link } from 'react-router-dom';

const RoomDropdownItem = props => (
  <div className="check">
    <Link to={`/:${props.room}`} >{props.room} </Link>
  </div>
);

export default RoomDropdownItem;
