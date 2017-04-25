import React from 'react';
import { connect } from 'react-redux';
import { getPreviousRoomNames, getPartners } from './../../actions/actionCreators';
import ProfileRoomsList from './ProfileRoomsList';

    // {props.previousRoomNames.map(roomName => <div>{roomName}</div>)}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.populatePartners = this.populatePartners.bind(this);
    this.requestPartners = this.requestPartners.bind(this);
  }

  componentDidMount() {
    // listen for 'got partners'
      // call populatePartners with payload
  }

  requestPartners() {
      // emit event 'get partners'
      // on event down in server, listen, trigger function, emit event 'got partners'
  }

  populatePartners(payload) {
    // dispatch action to populate state partners
    // action/reducer will be expecting an array of objects {name: name, id: id}
    this.props.getPartners(payload);
  }

  render() {
    return (
      <div className="col-md-12 container-fluid text-intro left-side">
        <h1 className="text-center">{this.props.userName}'s Profile </h1>
        <div className="col-md-3 profile-borders profile-height">
          <ProfileRoomsList />
        </div>
        <div className="col-md-9 profile-borders profile-height">
          This is where the saved code and messages from each room would go
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  previousRoomNames: state.previousRoomNames,
  userName: state.userName,
  partners: state.partners
});

const mapDispatchToProps = dispatch => ({
  getPreviousRoomNames: () => dispatch(getPreviousRoomNames()),
  getPartners: partners => dispatch(getPartners(partners))
});

// export default Profile;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);



        // {props.previousRoomNames.map(roomName => (
        //   <div className="black-text chat-message-container-other">
        //     {roomName}
        //   </div>))}
