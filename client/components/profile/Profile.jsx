import React from 'react';
import { connect } from 'react-redux';
import { getPreviousRoomNames } from './../../actions/actionCreators';

    // {props.previousRoomNames.map(roomName => <div>{roomName}</div>)}

const Profile = (props) => {
  console.log(props.previousRoomNames);
  // props.previousRoomNames();
  return (
    <div className="col-md-12 container-fluid text-intro left-side">
      <h1 className="text-center">{props.userName}Profile </h1>
      <div className="col-md-3 profile-borders profile-height">
        {props.previousRoomNames.map(roomName => (
          <div className="black-text chat-message-container-other">
            {roomName}
          </div>))}
      </div>
      <div className="col-md-9 profile-borders profile-height">
        This is where the saved code and messages from each room would go
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames,
  userName: state.userName
});

const mapDispatchToProps = dispatch => ({
  getPreviousRoomNames: () => dispatch(getPreviousRoomNames())
});

// export default Profile;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
